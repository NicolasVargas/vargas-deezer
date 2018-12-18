import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from './../../environments/environment';
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
    CommonModule
  ],
  providers: [...devProviders]
})
export class CoreModule { }
