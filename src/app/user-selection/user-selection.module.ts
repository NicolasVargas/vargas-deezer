import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserScreenComponent } from './user-screen/user-screen.component';
import { UserSelectionRoutingModule } from './user-selection-routing.module';


@NgModule({
  declarations: [UserScreenComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatRippleModule,
    UserSelectionRoutingModule
  ]
})
export class UserSelectionModule { }
