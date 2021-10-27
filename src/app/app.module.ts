import { LogsService } from './services/logs.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfiguracionesComponent } from './views/configuraciones/configuraciones.component';
import { VersionesComponent } from './views/versiones/versiones.component';
import { LogsComponent } from './views/logs/logs.component';
import { ConfigService } from './services/config.service';
import { MunicipalidadService } from './services/municipalidad.service';
import { FormVersionesComponent } from './views/versiones/form-versiones/form-versiones.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VersionService } from './services/version.service';
import { FilterPipe } from './pipe/filter.pipe';
import { PageVersionComponent } from './views/layouts/page-version.component';
import { FilterPipelog } from './pipe/filter.pipelog';
import { DatePipe } from '@angular/common';
//Material
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule,} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UpdateConfiguracionesComponent } from './views/update-configuraciones/update-configuraciones.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionesComponent,
    VersionesComponent,
    LogsComponent,
    FormVersionesComponent,
    FilterPipe,
    PageVersionComponent,
    FilterPipelog,
    UpdateConfiguracionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatSliderModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
   /* ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido',
          minlength: ({ requiredLength, actualLength }) =>
                      `Ingrese 4 digitos`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    })*/

  ],
  providers: [ConfigService, LogsService, VersionService, MunicipalidadService,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
