import { Component, OnInit } from '@angular/core';
import { Config } from '../../models/config';
import { ConfigService  } from '../../services/config.service';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-page-version',
  templateUrl: './page-version.component.html',
  styleUrls: ['./page-version.component.scss']
})
export class PageVersionComponent implements OnInit {
  anioVar = '2021'
  versionVar ='2.0'
  fechaVar!: String;
  var : string = '222'
  configs: Config[] = [];
  fechaActual! :String;
  constructor(private configService: ConfigService ) { }

  ngOnInit(): void {

this.mostrarUltimaVersionConfig();
this.fechaActual = new Date().toISOString().split('T')[0];

  }


  mostrarUltimaVersionConfig(){
  this.configService.getConfig().subscribe(
    configs => {
      this.configs = configs
      for (let index = 0; index < configs.length; index++) {
          if(this.configs[index].estado==='Activo')
          {
            const format = 'dd-MM-yyyy';
                    const myDate = '2019-06-29';
const locale = 'en-US';
this.fechaVar = formatDate(this.configs[index].fecha_instalacion, format, locale);
console.log("fecha",this.fechaVar)
          }

      }
    }

  );
  console.log("prueba",this.configs);
  }

}
