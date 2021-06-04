import { Component, OnInit, Inject } from '@angular/core';
import { Sample } from '../interfaces/sample'
import { SampleService } from '../services/sample.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete_dialog',
  templateUrl: './delete_dialog.html',
})
export class DeleteDialog implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) public sample: Sample,
      public dialogRef: MatDialogRef<DeleteDialog>,
      ) {}

    public _id: String;
    public files: [Object]
  
ngOnInit(){
  console.log(this.sample)
  this._id = this.sample._id;
  this.files = this.sample.files
}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-sample-overview',
  templateUrl: './sample-overview.component.html',
  styleUrls: ['./sample-overview.component.sass']
})
export class SampleOverviewComponent implements OnInit {


  constructor(
    private sampleService: SampleService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
        ) { }

  ngOnInit(): void {
    this.getAllSamples();
  }
  public samples = []; // todo enforce type

  private getAllSamples(): void {
    this.sampleService.getSample({}).then(data => { this.samples = data.samples; console.log(data) }, error => { console.error(error) })
  }

  public editSample(sample: Sample): void {
    this.router.navigate(['sample/', sample._id])
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

 public delete(sampleId: String): void {
//     this.sampleService.getSample({_id: sampleId}).then(data => { console.log(data.samples[0])// todo remove the nasty
//     const dialogRef = this.dialog.open(DeleteDialog, data.samples[0]);
//     dialogRef.afterClosed().subscribe(result => {
//       if (result === true) {
//         this.sampleService.deleteSample({_id: sampleId}).then(data=>{
//           this.openSnackBar("Success: Deleted sample " + sampleId + ".")
//           this.getAllSamples()
//         }, error => {
//           this.openSnackBar("Error: Could not delete sample.")
//           console.error(error)
//         })
//       } 
    
//   });
// }, error => console.error(error)) // todo error handling
//   }
   
 }
  
}