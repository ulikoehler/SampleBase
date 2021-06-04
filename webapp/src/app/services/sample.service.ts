import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostResponse } from '../interfaces/postResponse'
import { Sample } from '../interfaces/sample';
import { SampleQuery } from '../interfaces/sampleQuery';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  private configUrl = 'https://samplebase.automated-testing.net/api/sample/';

  constructor(private http: HttpClient) { }

  updateSample(sampleData: Sample): Promise<PostResponse> {
    return this.http.post<PostResponse>(this.configUrl + 'update', sampleData).toPromise()
  }

  deleteSample(sampleQuery: SampleQuery): Promise<PostResponse> {
    return this.http.post<PostResponse>(this.configUrl + 'remove', sampleQuery).toPromise()
  }

  getSample(sampleQuery: SampleQuery): Promise<PostResponse> {
    return this.http.post<PostResponse>(this.configUrl + 'query', sampleQuery).toPromise()
  }

  getAvailableFiles(sampleQuery: SampleQuery): Promise<PostResponse> {
    return this.http.post<PostResponse>(this.configUrl + 'getavailablesamplefiles', sampleQuery).toPromise()
  }
  updateSampleFiles(_id: String, files: [Object]): Promise<PostResponse> {
    return this.http.post<PostResponse>(this.configUrl + 'updatesamplefile', {_id: _id, files: files  }).toPromise()
  }

  uploadSingleFile(file: File, sampleId: String): Promise<PostResponse> {
    const uploadForm = new FormData()
    // {'fd66:6cbb:8c10:71ed:d7e2:978a:2048:3567': {name: "blubber.tiff", ...}}
    uploadForm.append(sampleId.toString(), file)
    return this.http.post<PostResponse>(this.configUrl + 'singleFileUpload', uploadForm).toPromise();
  }

  downloadFile(fileId: String, originalname: String): any {
    return this.http.post(this.configUrl + 'filedownload', {fileId: fileId, originalname: originalname}, { responseType: 'blob'})
  }

} 
