import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login-guard';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
    { path: 'login', component: LoginScreenComponent, canActivate: [LoginGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [LoginGuard]
})
export class LoginRoutingModule { }
