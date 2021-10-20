import { Config } from './../models/config';
import { Injectable } from '@angular/core';
import { Version } from '../models/version';
import { Observable, config } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class VersionService {
  private urlEndPoint3: string = 'http://localhost:8080/api/nsrtm/v1/version';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}
  /* 1 forma */
  getversion(): Observable<Version[]> {
    return this.http.get<Version[]>(this.urlEndPoint3);
  }




}
