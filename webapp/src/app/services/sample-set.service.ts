import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostResponse } from '../interfaces/postResponse'
import { SampleSet } from '../interfaces/sampleSet';
import { SampleSetQuery } from '../interfaces/sampleSetQuery';

@Injectable({
  providedIn: 'root'
})
export class SampleSetService {

  private configUrl = 'https://samplebase.automated-testing.net/api/sample-set/';

  constructor(private http: HttpClient) { }

  updateSampleSet(sample_set_data: any): Promise<PostResponse> {
    return this.http.post<PostResponse>(this.configUrl + 'update', sample_set_data).toPromise()
  }

  deleteSampleSet(sampleSetQuery: SampleSetQuery): Promise<PostResponse> {
    return this.http.post<PostResponse>(this.configUrl + 'remove', sampleSetQuery).toPromise()
  }

  getSampleSet(sampleSetQuery: SampleSetQuery): Promise<PostResponse> {
    return this.http.post<PostResponse>(this.configUrl + 'query', sampleSetQuery).toPromise()
  }

}
