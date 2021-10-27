import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from './../../../models/config';
import { ConfigService } from './../../../services/config.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { animation } from '@angular/animations';

@Component({
  selector: 'app-form-versiones',
  templateUrl: './form-versiones.component.html',
  styleUrls: ['./form-versiones.component.scss']
})
export class FormVersionesComponent implements OnInit {

  public config : Config = new Config;
  Estado : string[] = ['Version Liberada'];
  errores! :  String [];
  anio1! : number ;
  fecha! : String;
  textoSinFormato!  : string;
  fechaLiberacion1!:String;
  public currentDate: Date = new Date();

  constructor(private configServer : ConfigService,
              private router: Router,
              private activaterouter: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.cargarVersion();
    this.anio1=new Date().getFullYear();

  }


  public create(): void{

    this.configServer.create(this.config).subscribe(

      ( config ) => {
        this.router.navigate(['srtm/versiones']);
        Swal.fire('Nueva Version', `Nueva ${config.versionSrtm} ha sido creado con éxito`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
     // response => this.router.navigate(['srtm/versiones'])
    )

  }
  cargarData(id: any) {
    console.log('Data', this.config.anio);
    console.log('Data', id);
  }

  cargarVersion(): void {
    this.activaterouter.params.subscribe((params) => {
      console.log('Info', params);
      let id = params['id'];
      if (id) {
        this.configServer.getBuscar(id).subscribe((config: any) => {
          this.config = config;

          const format = 'dd-MM-yyyy';
          const locale = 'en-ES';
          console.log('formato', config);
          console.log('formato', config.fechaInicio);
          config.fechaLiberacion = formatDate(config.fechaLiberacion, format, locale);
          console.log('formato limpio', config.fechaInicio);
        });
      }
      this.cargarData(id);

    });
  }



  keyDownEvent(e:any){
    // Permitir la tecla para borrar
    if (e.key == 'Backspace') {return true;
    }
    // Permitir flecha izquierda
    if (e.key == 'ArrowLeft')
    {return true;}
    // Permitir flecha derecha
    if (e.key == 'ArrowRight'){ return true;
    }
    // Bloquear tecla de espacio
    if (e.key == ' ') {return false;}

    // Bloquear tecla si no es un numero
    if (isNaN(e.key)){ return false;}
   return true;
  }

  keyUpEvent(versionSrtm: any){

    versionSrtm.value = versionSrtm.value
                // Borrar todos los espacios
                .replace(/\s/g, '');

       //guardar texto sin formato en la variable textoSinFormato
       this.textoSinFormato = versionSrtm.value;

       versionSrtm.value = versionSrtm.value
                // Agregar un espacio cada dos numeros
                .replace(/([0-9]{2})/g, '$1 ')
                // Borrar espacio al final
                .trim();

  }



}

