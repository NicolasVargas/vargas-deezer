import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserScreenComponent } from './user-screen/user-screen.component';

const routes: Routes = [
    { path: 'users', component: UserScreenComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class UserSelectionRoutingModule { }
