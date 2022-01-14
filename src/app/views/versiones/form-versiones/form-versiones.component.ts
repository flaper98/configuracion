import { MyValidaciones } from './../../../utils/MyValidaciones';
import { config } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from './../../../models/config';
import { ConfigService } from './../../../services/config.service';
import { Component, OnInit, Input, APP_ID } from '@angular/core';
import swal from 'sweetalert2';
import { animation } from '@angular/animations';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form-versiones',
  templateUrl: './form-versiones.component.html',
  styleUrls: ['./form-versiones.component.scss']
})
export class FormVersionesComponent implements OnInit {

  public config : Config = new Config;
  config1 : Config[] = [] ;
  Estado : string[] = ['Version Liberada'];
  errores! :  String [];
  anio1! : number ;
  fecha! : String;
  textoSinFormato!  : string;
  fechaLiberacion1!:String;
  versiones23!: String;
  public currentDate: Date = new Date();

  public form! : FormGroup;

  constructor(private configServer : ConfigService,
              private router: Router,
              private activaterouter: ActivatedRoute,
              private fb :  FormBuilder
              ) {

                this.buildForm;

              }

  ngOnInit(): void {
    this.cargarVersion();
    this.anio1=new Date().getFullYear();


  }
 private buildForm(){
  this.versiones23 = this.config.version;
  console.log('buildform',this.versiones23 );


  this.form = this.fb.group({
    version : ['' , Validators.required,MyValidaciones.validVersiones(this.configServer) ],


    });
  }

   create(): void{

    this.configServer.create(this.config).subscribe((config): void  => {
        this.router.navigate(['srtm/versiones']);
        swal('Nueva Version', `ha sido creado con éxito`, 'success');

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
    if (e.key == 'Backspace') {
      return true;
    }
    // Permitir flecha izquierda
    if (e.key == 'ArrowLeft')
    {return true;}
    // Permitir flecha derecha
    if (e.key == 'ArrowRight'){
       return true;
    }
    // Bloquear tecla de espacio
    if (e.key == ' ')
    {return false;}

    // Bloquear tecla si no es un numero
    if (isNaN(e.key)){
       return false;}
   return true;
  }



  keyUpEvent(versionSrtm: any){
    /*versionSrtm.value = versionSrtm.value
                // Borrar todos los espacios
                .replace(/\s/g , '')*/

       //guardar texto sin formato en la variable textoSinFormato

      ///////// versionSrtm.value = versionSrtm.value
                // Agregar un espacio cada dos numeros
             //////////   .replace(/\D/g, "")
            //////////    .replace(/([0-9]{2})$/, '$1')
            /////////    .replace(/\B(?=(\d{2})+(?!\d)\.?)/g, ".");                // Borrar espacio al final
                ///([0-9]{2})/g , "$1"

                var num = versionSrtm.value.replace(/\./g,'');
                if(!isNaN(num)){
                num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{2})/g,'$1.');
                num = num.split('').reverse().join('').replace(/^[\.]/,'');
                versionSrtm.value = num;

  }



}


validateEmail(control: AbstractControl)  {
  const value = control.value;
  return this.configServer.getVersiones(value)
  .pipe(
    map(response => {
      const isEmailAvailable = response.version;
      return isEmailAvailable ? null : {notAvailable: true};
    })
  );


/*function numeral(val: any) {
  throw new Error('Function not implemented.');*/
}




}
