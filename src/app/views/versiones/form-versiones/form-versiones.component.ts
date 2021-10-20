import { Router } from '@angular/router';
import { Config } from './../../../models/config';
import { ConfigService } from './../../../services/config.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-versiones',
  templateUrl: './form-versiones.component.html',
  styleUrls: ['./form-versiones.component.scss']
})
export class FormVersionesComponent implements OnInit {

  public config : Config = new Config;
  Estado : string[] = ['Activo', 'Inactivo'];
  errores! :  String [];


  constructor(private configServer : ConfigService,
              private router: Router) { }

  ngOnInit(): void {
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



}

