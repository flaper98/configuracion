import { formatDate, DatePipe } from '@angular/common';
import  swal  from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from './../../models/config';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-configuraciones',
  templateUrl: './update-configuraciones.component.html',
  styleUrls: ['./update-configuraciones.component.scss']
})
export class UpdateConfiguracionesComponent implements OnInit {

  varEstado: string = 'Version Liberada';

  public config: Config = new Config();
  public dataActivo = 'disabled';
  isEnabled: boolean = true;

  errores!: string[];
  Tipo_Version : string[] = [ '' ,'Version Liberada' ];
  anio1! : number ;
  fechaliberacion1!:String;

  fechaa!: String;

  habilitar: boolean = true;
  periodolist: string[] = ['Diariamente', 'Semanalmente', 'Mensualmente'];
  constructor(
    private configServer: ConfigService,
    private router: Router,
    private activaterouter: ActivatedRoute,
    private datepipe: DatePipe

  ) {}

  setHabilitar() {
    this.habilitar = this.habilitar == true ? false : true;
  }

  datos() {
    if (this.config.estado == 'Version Liberada') {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.datos();
    this.cargarVersion();
    this.anio1=new Date().getFullYear();
    this.fechaa = new Date().toISOString().split('T')[0];



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
          const locale = 'en-US';
          console.log('formato', config);
          console.log('formato', config.fechaLiberacion);
          config.fechaInicio = formatDate(config.fechaInicio, format, locale);
          //config.fechaLiberacion = formatDate(config.fechaLiberacion, format, locale);
          console.log('formato limpio', config.fechaLiberacion);
        });
      }
      this.cargarData(id);
    });
  }
  update(): void {
    this.configServer.update(this.config).subscribe((config) => {
      this.router.navigate(['/srtm/versiones']);
      swal(
        'Configuración Actualizado',
        `actualizado con éxito!`,
        'success'
      );
    });
  }
  public create(): void{

    this.configServer.create(this.config).subscribe(

      response => this.router.navigate(['srtm/versiones'])
    )
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


                var num = versionSrtm.value.replace(/\./g,'');
                if(!isNaN(num)){
                num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{2})/g,'$1.');
                num = num.split('').reverse().join('').replace(/^[\.]/,'');
                versionSrtm.value = num;

  }



}



}

