import { Version } from './../../models/version';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Config } from '../../models/config';
import { ConfigService  } from '../../services/config.service';
import { VersionService  } from '../../services/version.service';
import { config } from 'rxjs';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-versiones',
  templateUrl: './versiones.component.html',
  styleUrls: ['./versiones.component.scss']
})
export class VersionesComponent implements OnInit {
  displayedColumns: string[] = ['anio', 'version', 'fecha','estado', 'symbol'];
  dataSource! : MatTableDataSource<any>;
  versionsVar:string ="";

  idVersionConfig!: string;
  idVersionConfig2!: string;

  @ViewChild(MatPaginator,{static: true}) paginator!: MatPaginator;
public varAnio = "";
 configs: Config[] = [];
versions: Version[] = [];
caractVersion: Version[] =[];
vardate!: Date;
codigoVersion: string[] =[];
version: Version = new Version();

private config :  Config = new Config();

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
               private _snackBar: MatSnackBar   ) {

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
this.configService.getConfig().subscribe(
  data => {this.configs = data
           this.dataSource = new MatTableDataSource(this.configs);
           this.dataSource.paginator = this.paginator;}

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
