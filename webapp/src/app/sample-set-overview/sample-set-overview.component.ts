import { Component, OnInit } from '@angular/core';
import { SampleSetService } from '../services/sample-set.service'
import { SampleSetQuery} from '../interfaces/sampleSetQuery'
import { SampleSet} from '../interfaces/sampleSet'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sample-set-overview',
  templateUrl: './sample-set-overview.component.html',
  styleUrls: ['./sample-set-overview.component.sass']
})
export class SampleSetOverviewComponent implements OnInit {

  public sampleSets=[]; //todo enforce type
  constructor(
    private sampleSetService: SampleSetService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAllSampleSets();
  }

  private getAllSampleSets(): void {
    this.sampleSetService.getSampleSet({}).then(data => { this.sampleSets=data.sampleSets; console.log(data) }, error => { console.error(error) })
  }

  public editSampleSet(sampleSet: SampleSet):void{
    this.router.navigate(['sample-set/', sampleSet._id])
  }

}
