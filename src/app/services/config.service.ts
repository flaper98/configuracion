import { AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Config } from '../models/config';
import {catchError, }from 'rxjs/operators';
import { Observable,throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule,HttpHeaders,} from '@angular/common/http';
import Swal from "sweetalert2";
import { URL_BACKEND } from '../config/configu';


@Injectable()
export class ConfigService {
    //  private urlEndPoint: string  = URL_BACKEND + '/api/nsrtm/v1/configuracion';
   private urlEndPoint: string  = ' http://localhost:8080/api/nsrtm/v1/versiones';


    //private urlEndPoint2: string =  URL_BACKEND +  '/api/nsrtm/v1/configuracion/update';
    private urlEndPoint2: string =  'http://localhost:8080/api/nsrtm/v1/versiones/update';


    //private urlEndPoint3: string =  URL_BACKEND +  '/api/nsrtm/v1/configuracion/getById';
    private urlEndPoint3: string = 'http://localhost:8080/api/nsrtm/v1/versiones/getById';

    //private urlEndPoint4: string =  URL_BACKEND +  '/api/nsrtm/v1/configuracion/create';
    private urlEndPoint4: string =    'http://localhost:8080/api/nsrtm/v1/versiones/create';


    private urLEndPoint5: String = 'http://localhost:8080/api/nsrtm/v1/versiones/version?version'




    private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})



    constructor( private http : HttpClient) {}
    /* 1 forma */
    getConfig(): Observable<Config[]>{
        return this.http.get<Config[]>(this.urlEndPoint);
    }
/*    create(config: Config): Observable<Config>{
        return this.http.post<Config>(this.urlEndPoint2,config, {headers: this.httpHeaders})

    } */

    getVersiones(version : String ): Observable<Config>
    {
      console.log("rutasversiones", version , this.urLEndPoint5 )
      return this.http.get<Config>(`${this.urLEndPoint5}=${version}`);

    }

    getBuscar(id: string):Observable<Config>{
        return this.http.get<Config>(`${this.urlEndPoint3}/${id}`)
      }

     update (config: Config): Observable<Config>{
        console.log("data_ ",config);
        return this.http.put<Config>(`${this.urlEndPoint2}/${config.id}`,config, {headers: this.httpHeaders})
      }


      create(config: Config) : Observable<Config>{

        return this.http.post<Config>(this.urlEndPoint4, config , {headers : this.httpHeaders}).pipe(
          map((response: any) => response.cliente as Config),
          catchError(e => {

            if (e.status == 400) {
              return throwError(e);
            }

            console.error(e.error.mensaje);
            Swal(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
      }

}


