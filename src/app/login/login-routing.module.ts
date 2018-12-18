import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutGuard } from '../core/auth/auth-guard';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
    { path: 'login', component: LoginScreenComponent, canActivate: [AutGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AutGuard]
})
export class LoginRoutingModule { }
