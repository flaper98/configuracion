import swal from 'sweetalert2';
import { LogsService } from './../../services/logs.service';
import { MunicipalidadService } from './../../services/municipalidad.service';
import { Component, HostBinding, Input, OnInit, Query } from '@angular/core';
import { Muni } from 'src/app/models/muni';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';
import { Logs } from '../../models/logs';
import { LiteralExpr, Binary } from '@angular/compiler';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  range = new FormGroup({
    logFechaInicio: new FormControl(),
    logFechaFinal: new FormControl(),
  });
  EstadoLog: string[] = ['Activo', 'Inactivo'];
  //Para traer los datos de models muni
  filterPost = '';
  filterMuni = '';

  codigoMuni: string[] = [];
  versionLog!: string;
  public activaForm: number = 0;
  public contador: number = 0;
  municipal: Muni[] = [];
  codMunicipalidad!: any;
  logg: Logs[] = [];
  datalogFecha!: String;
  datalogVersion!: String;
  datalogError!: String;
  datalogMensaje!: String;
  datalogEstado!: String;
  logFechaInicio!: String;
  logFechaFinal!: String;
  logestado!: String;
  logFInicio!: String;
  logFFinal!: String;
  dataPrueba!: any;
  nameMuni: string = '';
  codMuni: string = '';
  _idMuni: string = '';
  archivoCod!: string ;
  codigoMuni1!: String;

  muni: Muni = new Muni();
  log: Logs = new Logs();
  dataLogGeneral: Logs[] = [];
  public logInstalacion: Logs[] = [];
  isDisabled = true;
  toastr: any;
  constructor(
    private logsService: LogsService,
    private municipalidadService: MunicipalidadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  boton_pulsado: boolean = false;

  trackByItems(index: number, item: any): number {
    return item.id;
  }
  funcion() {
    this.boton_pulsado = !this.boton_pulsado;
  }

  ngOnInit() {
    //this.mostrarMunicipalidad();
    this.mostrarLogInstalacion();
   // this.cargarMuniImput();
    this.logFechaInicio = new Date().toISOString().split('T')[0];
    this.logFechaFinal = new Date().toISOString().split('T')[0];



  }

  mostrarMunicipalidad(): void {
    this.municipalidadService
      .getmunicipalidad()
      .subscribe((municipal) => (this.municipal = municipal));
  }
  mostrarLogInstalacion(): void {
    this.logsService.getlogInsalacion().subscribe((logg) => (this.logg = logg));
  }

  /* Pruebas*/
/* getLogInstalacion(codigo:String){
  this.logsService.getLogInst().subscribe(
    (data:any) =>{ this.logg =data;
      console.log("Cod Metodo",codigo);
      for (let indexOf =0; indexOf < data.length; indexOf++) {
        this.codigoMuni[indexOf] = data[indexOf].muncipalidad[0].secEjec;
        if(this.codigoMuni[indexOf]===codigo){
           const format = 'yyyy-MM-dd';
           const locale = 'en-ES';
           this.logFInicio = formatDate(data[indexOf].fecha, format, locale);
           if(this.logFechaInicio <= this.logFInicio &&
             this.logFInicio<= this.logFechaFinal
             && this.logestado== data[indexOf].estado){
              this.dataLogGeneral[this.contador]=data[indexOf];
              this.contador++;
             }

            /* if(this.logFechaInicio <= this.logFInicio &&  this.logFInicio<= this.logFechaFinal){
              this.dataLogGeneral[this.contador]=data[indexOf];
              this.contador++;
               }
    }
  }*/

   GetLog(codigo: String) {
    this.logsService.getLogSecEject(codigo).subscribe((data: any) => {
      this.logg = data;
      console.log('Cod Metodo', data);
      for (let indexOf = 0; indexOf < data.length; indexOf++) {
        this.dataLogGeneral[indexOf]  = data[indexOf].secEjec;
        if (this.dataLogGeneral[indexOf]) {
          const format = 'yyyy-MM-dd';
          const locale = 'en-ES';
          this.logFInicio = formatDate(data[indexOf].fecha, format, locale);
          if (
            this.logFechaInicio <= this.logFInicio &&
            this.logFInicio <= this.logFechaFinal) {
            this.dataLogGeneral[this.contador] = data[indexOf];
            this.contador++;
          }



        }
      }
       codigo='0';
      console.log('Contador Final', this.contador);
      /*console.log("data",this.codigoMuni);
    console.log("Cod Muni",data);
  */
    });
  }

  /* Pruebas*/

  /*cargarMuniImput() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.municipalidadService
          .BuscarMunicipalidad(id)
          .subscribe((muni) => (this.muni = muni));
      }
    });
  }*/

  cargarLogInstalacion() {
    this.activatedRoute.params.subscribe((params) => {
      let secEjec = params['secEjec'];
      if (secEjec) {
        this.logsService
          .getLogSecEject(secEjec)
          .subscribe((log) => (this.log = log));
      }
    });
  }

  redirectToUrl(id: string) {
    const URLREDIRECT = `/srtm/log/${id}`;
    window.location.href = `${URLREDIRECT}`;
  }
  //addMunicipalidad(id: string, nombreMuni: string, codeMuni: string) {
    addMunicipalidad(id: string,codeMuni: string , archivo: string) {

    this._idMuni = id;
    //this.nameMuni = nombreMuni;
    this.codMuni = codeMuni;
    this.archivoCod = archivo;

  }
  tocuchdBuscar: boolean = false;
  buscarDataMuni(codigo: String): void {
   // this.tocuchdBuscar = true;
    this.contador = 0;
    console.log('Cod Select', codigo);
    //this.getLogInstalacion(codigo);
    this.GetLog(codigo);
  }
  refresh(): void {
    window.location.reload();
  }


//DESCARGAR ARCHIVO

  DownloadLog(codigo: string ): void{

    console.log('descargar archivo')
    const filename = `reporte_${Math.random()}.log`;

    this.logsService.getLogArchivo(codigo).subscribe(response => {
      this.manangeLogFile(response, filename);
      this.toastr.success('Reporte Descargo Conrrectamente');
    })
  }
  manangeLogFile(response: any, filename: string): void{
    debugger;
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);

    const filtePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}))
    const downloadLink = document.createElement('a');
    downloadLink.href = filtePath;
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click;

  }



}
