import { Binary } from '@angular/compiler';
import { Muni } from 'src/app/models/muni';
import { Injectable } from "@angular/core";
import { Logs } from 'src/app/models/logs';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class LogsService {
    private urlEndPoint2: string = 'http://localhost:8080/api/nsrtm/v1/logs';
    private url: string = ' http://localhost:8080/api/nsrtm/v1/logs/logSec?secEjec';
    private urlEndPoint3: String = ' http://localhost:8080/api/nsrtm/v1/logs/archivo?archivo';
    public  muni : Muni = new Muni;
    public logs : Logs = new Logs;


    private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
    constructor( private http : HttpClient) {}



getlogInsalacion():Observable<Logs[]>{
  return this.http.get<Logs[]>(this.urlEndPoint2).pipe(
    catchError(e => {
      if (e.status != 401 && e.error.mensaje) {
        console.error(e.error.mensaje);
      }

      return throwError(e);
    }));
};

getLogInst(){
  return this.http.get(this.urlEndPoint2);
}


getLogSecEject(secEjec: String ): Observable<Logs>
{
  console.log("rutaLog", secEjec , this.url )
  return this.http.get<Logs>(`${this.url}=${secEjec}`);

}



getLogArchivo(id : String): Observable<Logs>
{

  return this.http.get<Logs>(`${this.urlEndPoint3}=${id}`);


}


    }


