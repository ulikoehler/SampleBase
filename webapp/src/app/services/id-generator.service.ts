import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IdRequest } from '../interfaces/idRequest'

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  private configUrl = 'https://samplebase.automated-testing.net/api/getnewid';

  constructor(private http: HttpClient) { }

  public getNewId(): Promise<IdRequest> {
    return this.http.get<IdRequest>(this.configUrl).toPromise()
  }
}
