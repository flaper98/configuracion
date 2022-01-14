import { ConfiguracionesComponent } from './../configuraciones/configuraciones.component';
import { Version } from './../../models/version';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Config } from '../../models/config';
import { ConfigService  } from '../../services/config.service';
import { VersionService  } from '../../services/version.service';
import { config } from 'rxjs';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { OrderByPipe } from 'src/app/pipe/order-by.pipe';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { LiveAnnouncer } from '@angular/cdk/a11y';



@Component({
  selector: 'app-versiones',
  templateUrl: './versiones.component.html',
  styleUrls: ['./versiones.component.scss']
})
export class VersionesComponent implements OnInit {
  displayedColumns: string[] = ['anio', 'version', 'fecha','estado', 'symbol'];
  dataSource! : MatTableDataSource<Config>;
  versionsVar:string ="";

  idVersionConfig!: string;
  idVersionConfig2!: string;

  @ViewChild(MatPaginator,{static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

public varAnio = "";
 configs: Config[] = [];
versions: Version[] = [];
caractVersion: Version[] =[];
vardate!: Date;
codigoVersion: string[] =[];
version: Version = new Version();

public config :  Config = new Config();

anio1! : number ;

 clickedRows = new Set<Config>();
 public selectUsers(event: any, config: any) {
  config.flag = !config.flag;
  console.log("llegando marcado" , config);
  if(this.method1CallForClick == null){
    return event;

  }else if(this.method2CallForDblClick !=null){
    this.method2CallForDblClick == this.redirectToUrl;

  }

 }  constructor(private configService: ConfigService ,
               private versionService : VersionService ,
               private myRoute: Router,
               public dialog: MatDialog,
               private _snackBar: MatSnackBar,
               private _liveAnnouncer: LiveAnnouncer
                ) {

   /*new Date(String) ;
    let dateString1= '10-06-2015'
    let dateString2= 'asdfasdfasdfads'
    let newDate = new Date(dateString);*/


   // console.log(newDate) // Tue Oct 06 2015 05:30:00 GMT+0530 (India Standard Time)


  }

  ngOnInit(): void {
    this.method1CallForClick;
    this.method2CallForDblClick;
    this.BuscarVersion;
    this.anio1=new Date().getFullYear();
    //sthis.dataSource.sort = this.sort;

this.configService.getConfig().subscribe(
  data => {this.configs = data
           this.dataSource = new MatTableDataSource(this.configs);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;

          }

);

this.versionService.getversion().subscribe(
  data => {this.versions = data}

);



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(event);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  selectRadioButton(id: string,sss: string){
    console.log(id);
    this.idVersionConfig =id;
  this.idVersionConfig2=id;

    this.versionsVar =sss;

  }

  moveToSelectedTab( index: string) {
    console.log("Valor",index);
   if(index!=null && index!=""){
    this.redirectToUrl(index);
   }else {
     this._snackBar.open('Error: selecionar una version','',{
       duration:5000,
       horizontalPosition:'center',
       verticalPosition: 'top'
     })
   }
  }

  redirectToUrl(url: string) {
    const URLREDIRECT = `srtm/detalle/${url}`;
    window.location.href = `${URLREDIRECT}`;
    this.isSingleClick = false;
    doTheStuffDblClickHere();
  }
  isSingleClick: Boolean = true;


  moveToSelectedTab2( index: string) {
    console.log("Valor",index);
   if(index!=null && index!=""){
    this.redirectToUrl2(index);
   }else {
     this._snackBar.open('Error: selecionar una version','',{
       duration:5000,
       horizontalPosition:'center',
       verticalPosition: 'top'
     })
   }
  }

  redirectToUrl2(url: string) {
    const URLREDIRECT = `srtm/configuracion/${url}`;
    window.location.href = `${URLREDIRECT}`;
    this.isSingleClick = false;
    doTheStuffDblClickHere2();
  }

method1CallForClick(){
   this.isSingleClick = true;
        setTimeout(()=>{
            if(this.isSingleClick){
                 doTheStuffHere();
            }
         },250)
}
method2CallForDblClick(id:String){
         this.isSingleClick = false;
         doTheStuffDblClickHere();
        this.redirectToUrl;
}

  Buscarconfiguracion(){

    this.redirectToUrl;
  }


selectRow(id:String) {
  console.log(id);
}

getBuscarversion(codigo:String){
  this.versionService.getversion().subscribe(
    (data:any) =>{ this.versions =data;
      console.log("Cod Metodo",codigo);
      for (let indexOf =0; indexOf < data.length; indexOf++) {
        this.codigoVersion[indexOf] = data[indexOf].version[0].versionSrtm;
    }

  })
}
tocuchdBuscar:boolean=false;
BuscarVersion(codigo:String): void{
this.tocuchdBuscar==true;
this.getBuscarversion;
console.log("Cod Select",codigo);
this.selectUsers;
}


keyUpEvent(versionSrtm: any){

  /*versionSrtm.value = versionSrtm.value
              // Borrar todos los espacios
              .replace(/\s/g , '')*/

     //guardar texto sin formato en la variable textoSinFormato

     versionSrtm.value = versionSrtm.value
              // Agregar un espacio cada dos numeros
              .replace(/\D/g, "")
              .replace(/([0-9])([0-9]{2})$/, '$1.$2')
              .replace( ".");                // Borrar espacio al final
              ///([0-9]{2})/g , "$1"


}

announceSortChange(sortState: Sort) {
  // This example uses English messages. If your application supports
  // multiple language, you would internationalize these strings.
  // Furthermore, you can customize the message to add additional
  // details about the values being sorted.
  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}



}


function doTheStuffHere() {
  throw new Error('Function not implemented.');
}

function doTheStuffDblClickHere() {
  throw new Error('Function not implemented.');
}

function doTheStuffDblClickHere2() {
  throw new Error('Function not implemented.');
}
