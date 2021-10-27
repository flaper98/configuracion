import { VersionService } from './../../services/version.service';
import { Config } from './../../models/config';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { formatDate } from '@angular/common';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
})
export class ConfiguracionesComponent implements OnInit {
  varEstado: string = 'Activo';

  public config: Config = new Config();
  public dataActivo = 'disabled';
  isEnabled: boolean = true;
  fechaInicio!: string;
  fechaLibera!: String;
  errores!: string[];
  Estado : string[] = ['Activo', 'Inactivo'];
  anio1! : number ;


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
    if (this.config.estado == 'Activo') {
      return false;
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.datos();
    this.cargarVersion();
    this.anio1=new Date().getFullYear();
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
          console.log('formato', config.fechaInicio);
           config.fechaLiberacion = formatDate(config.fechaLiberacion, format, locale);
          console.log('formato limpio', config.fechaInicio);
        });
      }
      this.cargarData(id);
    });
  }

  update(): void {
    this.configServer.update(this.config).subscribe((config) => {
      this.router.navigate(['/srtm/versiones']);
      swal.fire(
        'Configuración Actualizado',
        `actualizado con éxito!`,
        'success'
      );
    });
  }


  public create(): void{


    this.configServer.create(this.config).subscribe(

      config => {
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



}


