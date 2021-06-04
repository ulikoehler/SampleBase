import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SampleSetService } from '../services/sample-set.service'
import { SampleService } from '../services/sample.service'
import { IdGeneratorService } from '../services/id-generator.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IdRequest } from '../interfaces/idRequest'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Material } from '../interfaces/material'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { SampleSet } from '../interfaces/sampleSet';
import { QrCodeScannerComponent } from "../qr-code-scanner/qr-code-scanner.component";

@Component({
  selector: 'app-sample-set',
  templateUrl: './sample-set.component.html',
  styleUrls: ['./sample-set.component.sass']
})
export class SampleSetComponent implements OnInit {
  public sampleSetForm: FormGroup;
  public newAssociatedSampleForm: FormGroup;

  public _id: String;
  private result: IdRequest = null;
  
  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sampleSetService: SampleSetService,
    private sampleService: SampleService,
    private router: Router,
    private idGeneratorService: IdGeneratorService,
    public dialog: MatDialog) {
    // todo: form validation
    this.sampleSetForm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'creationTimestamp': new FormControl('', Validators.required),
      'associatedSamples': new FormControl([], Validators.nullValidator), // todo: enforce type empty string array
      'materials': new FormControl([], Validators.required)
    });
    this.newAssociatedSampleForm = new FormGroup({
      '_id': new FormControl([], Validators.required),
    })
  }


  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params: ', params['_id'])
      if (params['_id'] != 'new') {
        this.sampleSetService.getSampleSet({ _id: params['_id'] })
          .then((data) => {
            let sampleSet = data.sampleSets[0];
            this._id = sampleSet._id;
            this.sampleSetForm.setValue({
              description: sampleSet.description,
              creationTimestamp: sampleSet.creationTimestamp,
              associatedSamples: sampleSet.associatedSamples,
              materials: sampleSet.materials
            })
          }, error => { console.error(error) }
          )
      }
      else {
        this.setSampleSetId();
        this.sampleSetForm.setValue({
          description: '',
          creationTimestamp: this.getCurrentTimeStamp(),
          associatedSamples: [],
          materials: [
            {
              code_DIN_EN_10027: '1.4404',
              shortname__DIN_EN_10027: 'Edelstahl',
              properties: 'nichtrostend austenitischer Stahl'
            }]

        })
      }
    })
  }


  // UI related vars
  public panelOpenState = false; // associated sample expansion panel
  // chips
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
 
  private setSampleSetId(): void {
    this.idGeneratorService.getNewId().then(data => { this._id = data.id }, error => { console.error(error) })
  }

  private getCurrentTimeStamp(): String {
    return new Date().toISOString()
  }
  // add chip material
  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // add material
    if ((value || '').trim()) {

      // todo load available materials for validation and info completion

      // todo Validation

      this.sampleSetForm.value.materials.push({ code_DIN_EN_10027: value.trim() });
    }

    // reset input value
    if (input) {
      input.value = '';
    }
  }

  public remove(material: Material): void {
    const index = this.sampleSetForm.value.materials.indexOf(material);

    if (index >= 0) {
      this.sampleSetForm.value.materials.splice(index, 1);
    }
  }
  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public addNewAssociatedSample(_id: String): void {
    this.sampleService.updateSample({ _id: _id }).then(
      data => {
        this.openSnackBar('Succes: Created sample.')
      },
      error => {
        console.error(error);
        this.openSnackBar('Error: Could not create sample.')
      }
    )
    this.sampleSetForm.value.associatedSamples.push(this.newAssociatedSampleForm.value._id)
    this.newAssociatedSampleForm.reset();
  }

  public editAssociatedSample(_id: String): void {
    this.router.navigate(['sample/', _id])
  }

  public removeAssociatedSample(_id: String): void {
    let i
    this.sampleSetForm.value.associatedSamples.some(function (item, index) {
      if (item === _id) i = index;
    })
    this.sampleSetForm.value.associatedSamples.splice(i, 1)
    this.openSnackBar('Warning: Did not delete the sample, only removed it from this set.')
  }

  public submit = function (): void {
    console.log(this.sampleSetForm.value.associatedSamples)
    const sampleSetData = {
      _id: this._id,
      description: this.sampleSetForm.value.description,
      associatedSamples: this.sampleSetForm.value.associatedSamples,
      materials: this.sampleSetForm.value.materials,
      creationTimestamp: this.sampleSetForm.value.creationTimestamp,
      lastEditedTimestamp: this.sampleSetForm.value.lastEditedTimestamp
    }
    this.sampleSetService.updateSampleSet(sampleSetData).then(
      data => {
        this.openSnackBar('Succes: Saved sample set to database.')
      },
      error => {
        console.error(error);
        this.openSnackBar('Error: Could not save sample set.')
      }
    )
  }

  public openDialog() {
    const dialogRef = this.dialog.open(QrCodeScannerComponent,{panelClass: 'qr-code-scanner-pane'});

    dialogRef.afterClosed().subscribe(result => {
      this.newAssociatedSampleForm.setValue({_id: result});
    }, error => console.log(error));
  }

  public scanQRCode() {this.openDialog()}

}
