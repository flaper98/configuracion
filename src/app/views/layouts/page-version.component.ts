import { config } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Config } from '../../models/config';
import { ConfigService  } from '../../services/config.service';
import { DatePipe, formatDate } from "@angular/common";

@Component({
  selector: 'app-page-version',
  templateUrl: './page-version.component.html',
  styleUrls: ['./page-version.component.scss']
})
export class PageVersionComponent implements OnInit {

  fechaVar!: String;
  configs: Config[] = [];
  fechaActual! : Date;
  fechaActual1!: String;
  format = 'dd-mm-yyyy';
  locale = 'en-ES';
   require! : String ;
  desdeStr! : String;
  ultiversion: String = '' ;
  anio1!: number;
  validVersion: String [] = [] ;




  public currentDate: Date = new Date();
  valid1!: string;

  constructor(private configService: ConfigService ,
    public datePipe: DatePipe,) { }

  ngOnInit(): void {

this.mostrarUltimaVersionConfig();
//this.fechaActual = new Date().toISOString().split('T')[0];
this.fechaActual = new Date();
this.anio1=new Date().getFullYear();


  }

  mostrarUltimaVersionConfig(){
  this.configService.getConfig().subscribe(
    configs => {
      this.configs = configs
      for (let index = 0; index < configs.length; index++) {
          if(this.configs[index].estado==='Version Liberada')
          {
            const format = 'dd-MM-yyyy';
        const locale = 'en-US';
        this.fechaVar = formatDate(this.configs[index].fecha_instalacion, format, locale);
        console.log("fecha",this.fechaVar)
          }

      }

    }

  );
  console.log("prueba",this.configs);
  }

   /* nuevaVersion: String = '';
    VersionACtual: String[] = [];
  validar_version(veract : String ): Boolean{
        var fechas;
        var fehcas2;

        var valid1 ;
        var valid2;
        var valid3;

    for(let index = 0; index < this.configs.length; index++) {

      if(this.configs[index].versionSrtm > this.valid1){


        this.valid1=this.configs[index].versionSrtm;
        console.log('probando version' + valid1)

        /*this.validVersion = this.configs[index].versionSrtm.split('.');
        this.VersionACtual = veract.split('.');
        console.log("Validar Version" , this.validVersion);

        for(let f=0 ; f < this.validVersion.length ; f++){

          if(f==0){
            valid1 = this.validVersion[f];
          }
          if(f==1){
            valid2 = this.validVersion[f];

            if(valid2 > this.validVersion[f]){

            console.log('valid2' + this.validVersion)
            }
          }
          if(f==2){
            valid3 = this.validVersion[f];
          }

          //this.nuevaVersion = this.validVersion[f]+ this.validVersion[(f+1)] ;
            console.log("Mostrar Nueva Version" , this.nuevaVersion)
        }
      }

    }
  }}
    return true;

  }
  */






}
