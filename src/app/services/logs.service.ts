import { Muni } from 'src/app/models/muni';
import { Injectable } from "@angular/core";
import { Logs } from 'src/app/models/logs';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class LogsService {
    private urlEndPoint2: string = 'http://localhost:8080/api/nsrtm/v1/loginstalacion';
    private url: string = ' http://localhost:8080/api/nsrtm/v1/loginstalacion';
    public  muni : Muni = new Muni;

    private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
    constructor( private http : HttpClient) {}

getlogInsalacion():Observable<Logs[]>{
  return this.http.get<Logs[]>(this.urlEndPoint2);
}
getLogInst(){
  return this.http.get(this.urlEndPoint2);
}



    }


