import { Component } from '@angular/core';
import { PrincipalService } from './core/principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vargas-deezer';

  constructor(public principalService: PrincipalService, public router: Router) {}

  changeUser() {
    this.principalService.removePrincipal();
    this.router.navigate(['login']);
  }
}
