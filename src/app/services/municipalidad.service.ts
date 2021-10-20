import { Muni } from 'src/app/models/muni';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class MunicipalidadService {
  private urlEndPoint: string =
    ' http://localhost:8080/api/nsrtm/v1/municipalidad';
  private urlEndPoint3: string =
    ' http://localhost:8080/api/nsrtm/v1/municipalidad/getById';

  public municipal: Muni = new Muni();

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  getmunicipalidad(): Observable<Muni[]> {
    return this.http.get<Muni[]>(this.urlEndPoint);
  }
  BuscarMunicipalidad(id: String): Observable<Muni> {
    return this.http.get<Muni>(`${this.urlEndPoint3}/${id}`);
  }
}
