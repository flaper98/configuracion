import { AbstractControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ConfigService } from './../services/config.service';
export class MyValidaciones{





  static validVersiones(configService : ConfigService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return configService.getVersiones(value)
      .pipe(
        map(response => {
          const isEmailAvailable = response.version;
          return isEmailAvailable ? null : {notAvailable: true};
        })
      );
    };
  }

  validVersiones(){


  }



}
