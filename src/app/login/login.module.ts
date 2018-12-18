import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRoutingModule } from './login-routing.module';
import { LoginScreenComponent } from './login-screen/login-screen.component';


@NgModule({
  declarations: [LoginScreenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatRippleModule,
    LoginRoutingModule,
    ScrollDispatchModule
  ]
})
export class LoginModule { }
