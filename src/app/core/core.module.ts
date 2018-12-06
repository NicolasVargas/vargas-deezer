import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesModule } from './services/services.module';
import { environment } from './../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorsInterceptor } from './corsInterceptor';

let devProviders = [{
  provide: HTTP_INTERCEPTORS,
  useClass: CorsInterceptor,
  multi: true
}];
if (environment.production) {
  devProviders = [];
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule
  ],
  providers: [...devProviders]
})
export class CoreModule { }
