import { Binary } from '@angular/compiler';
import { Muni } from './muni';
export class Logs {

  id!: String;
  fechaRegistro! : Date;
  mensaje!: String;
  estado!:String;
  municipalidad!: Muni;
  secEjec!: String;
  archivo! : Binary;
}
