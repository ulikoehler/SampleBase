import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse  } from '@angular/common/http'
import {MatTableDataSource} from '@angular/material/table';


// services
import { SampleService } from '../services/sample.service'
import { IdGeneratorService } from '../services/id-generator.service';

// interfaces
import { _File } from '../interfaces/_file'
import { Material } from '../interfaces/material'

// third party
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.sass']
})
export class SampleComponent implements OnInit {

  // sample properties handled outside the form
  public _id: String;
  public sample_associated_files :  [_File] = void{} ;
  public originalname: String; //todo better solution!

  // available files for blob download
  public availableFiles: [_File];
  public upload: any

  // sample form group
  public sampleForm: FormGroup;

  // MatTableDataSource for measurement
  public measurementDataSource: MatTableDataSource<any>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private sampleService: SampleService,
    private idGeneratorService: IdGeneratorService,
    public dialog: MatDialog) {
    // todo: form validation
    this.sampleForm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'creationTimestamp': new FormControl('', Validators.required),
      'materials': new FormControl([], Validators.nullValidator), //todo add validator
      'measurements': new FormControl([], Validators.nullValidator),
      'status': new FormControl('', Validators.nullValidator),
    });
  }
  ngOnInit(): void {
    // initiate data source after FormGroup is built!
    this.measurementDataSource = new MatTableDataSource(this.sampleForm.value.measurements);

    this.route.params.subscribe(params => {
      if (params['_id']) {
        this.sampleService.getSample({ _id: params['_id'] })
          .then( data => {

            // get sample data
            let sample;
            if (data.samples.length == 1)   sample = data.samples[0]; // service returns array
            else console.error('Multiple samples with the same unique identifier!')

            // populate form
            if (!sample.creationTimestamp) this.sampleForm.controls['creationTimestamp'].setValue(this.getCurrentTimeStamp());
            if (sample.creationTimestamp) this.sampleForm.controls['creationTimestamp'].setValue(sample.creationTimestamp);
            if (!sample.materials) this.sampleForm.controls['materials'].setValue([
              {
                code_DIN_EN_10027: '1.4404',
                shortname__DIN_EN_10027: 'Edelstahl',
                properties: 'nichtrostend austenitischer Stahl'
              }]);
            if (sample.status) this.sampleForm.controls['status'].setValue(sample.status);
            if (sample.materials) this.sampleForm.controls['materials'].setValue(sample.materials);
            if (sample.description) this.sampleForm.controls['description'].setValue(sample.description);
            if (sample.measurements) this.sampleForm.controls['measurements'].setValue(sample.measurements)
            else this.sampleForm.controls['measurements'].setValue([])

            // sample _id and associated files are not accounted for in the form!
            if (sample.files) { this.sample_associated_files = sample.files };
            this._id = sample._id;

          }, error =>{ if(error) this.router.navigate(['not-found'])},
          ).then( ()=>     this.measurementDataSource.data =  this.sampleForm.value.measurements
          )
        // populate available files
        this.sampleService.getAvailableFiles({ _id: params['_id'] })
          .then((data) => {
            console.log(data)
            this.availableFiles = data.files
          }, error => { console.error(error) } )

        
      }
      else {
        console.error('provided a sample without valid _id')
      }
    })
  }

  // UI related vars

  // table
  public measurementColumns: String[] = ['measurement_identifier', 'measurement', 'measurement_value', 'measurement_value_unit']
  public displayedColumns: String[] = ['originalname', 'fileId', 'download'];
  // chips, see angular material module
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // add chip 
  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // add material
    if ((value || '').trim()) {

      // todo load available materials for validation and info completion

      // todo Validation

      this.sampleForm.value.materials.push({ code_DIN_EN_10027: value.trim() });
    }

    // reset input value
    if (input) {
      input.value = '';
    }
  }

  public addNewMeasurement(): void {
    console.log('new Measurment ', this.sampleForm.value)
    this.sampleForm.value.measurements.push({
      measurment: '',
      measurement_identifier: '',
      measurement_value: 0,
      measurement_value_unit: '',
    })
    this.measurementDataSource.data =  this.sampleForm.value.measurements
  }

  private getCurrentTimeStamp(): String {
    return new Date().toISOString()
  }

  public remove(material: Material): void {
    const index = this.sampleForm.value.materials.indexOf(material);

    if (index >= 0) {
      this.sampleForm.value.materials.splice(index, 1);
    }
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public submit = function (): void {
    console.log(this.sampleForm.value)
    const sampleSetData = {
      status: this.sampleForm.value.status,
      _id: this._id,
      description: this.sampleForm.value.description,
      materials: this.sampleForm.value.materials,
      measurements: this.sampleForm.value.measurements,
      files: this.files,
      creationTimestamp: this.sampleForm.value.creationTimestamp,
      lastEditedTimestamp: this.getCurrentTimeStamp(),
    }
    this.sampleService.updateSample(sampleSetData).then(
      data => {
        this.openSnackBar('Succes: Saved sample set to database.')
      },
      error => {
        console.error(error);
        this.openSnackBar('Error: Could not save sample set.')
      }
    )
  }

  public setFile(e: Event){
    const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
    this.upload =files[0];
  }

  // upload file and update files of sample
  public uploadFile(file: File, originalname: String) {
    console.log('bekommt er nicht dasf fiele? ', file, originalname)
    let newFileId: String;
    // create newFileId for new file
    this.idGeneratorService.getNewId().then(data => { newFileId = data.id },
      error => { console.error(error); this.openSnackBar('Error: Could not obatin a unique identifier from server.') }
      )
      .then(() => {
            // upload the file with its newFileId      
            console.log('to be uploaded', file)
        this.sampleService.uploadSingleFile(file, newFileId).then(data => {
              if(this.sample_associated_files == void{}) this.sample_associated_files = [{originalname: originalname, fileId: newFileId}]
              else this.sample_associated_files.push({originalname: originalname, fileId: newFileId})
              console.log('files of current sample: ', this.sample_associated_files)
              // update the sample's files
              this.sampleService.updateSampleFiles(this._id, this.sample_associated_files).then(data => {
              this.openSnackBar('Succes: Uploaded file and referenced it to sample');
         }, error => {
              console.error(error), this.openSnackBar('Error: Referencing file to sample.')
            })
          }, error => {
            console.error(error), this.openSnackBar('Error: Failed to upload file.')
          }
          );
        })
  }

  public delete(sampleId: String) {
    this.sampleService.deleteSample({_id: sampleId}).then(data=>{
      this.openSnackBar("Success: Deleted sample " + sampleId + ".")
    }, error => {
      this.openSnackBar("Error: Could not delete sample.")
      console.error(error)
    })
  }

  public download = function (fileId: String, originalname: String): void {
    console.log(fileId)
    let thefile = {};
    this.sampleService.downloadFile(fileId, originalname)
      .subscribe( (data: HttpResponse<any>) => {
        console.log('downloading file ', data)
        this.downloadFile(data, originalname);}
        ,error => {console.error(error)})
  }

  public downloadFile(data: any, filename?: String) {
    const blob = new Blob([data]);
     const url= window.URL.createObjectURL(blob);
    if (filename) saveAs(blob, filename); else saveAs(blob)

     window.open(url);
     window.URL.revokeObjectURL(url);

  }

}

