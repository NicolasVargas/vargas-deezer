import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: !environment.production })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
