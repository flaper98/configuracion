import { DecimalPipe } from "@angular/common";

export class Config {
    push(arg0: any) {
      throw new Error('Method not implemented.');
    }

    id!: string;
    anio!: string;
    version!: String;
    fecha_instalacion!: Date ;
    InicioSrtm!: Date;
    fechaLiberacion! : Date;
    horaInicio!: string;
    periodo!: string;
    numIntentos! : string;
    recurrencia!: string;
    frecuenciaRecorrida!: string;
    intervaloFrecuencia!: string;
    urlDescarga!: string;
    estado!: string;
    mensaje: any;
    flag: boolean = false;
    config: any;

}
