import { UpdateConfiguracionesComponent } from './views/update-configuraciones/update-configuraciones.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VersionesComponent } from './views/versiones/versiones.component';
import { ConfiguracionesComponent } from './views/configuraciones/configuraciones.component';
import { LogsComponent } from './views/logs/logs.component';
import { FormVersionesComponent } from './views/versiones/form-versiones/form-versiones.component';

const routes: Routes = [
  {path: '' , redirectTo: '/srtm/versiones', pathMatch: 'full' },
  {path: 'srtm/versiones', component : VersionesComponent},
  {path: 'srtm/config', component : FormVersionesComponent},
  {path: 'srtm/log', component : LogsComponent},
  {path: 'srtm/log/:id', component : LogsComponent},
  {path: 'srtm/detalle/:id', component : ConfiguracionesComponent},
  {path: 'srtm/configuracion/:id', component : UpdateConfiguracionesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
