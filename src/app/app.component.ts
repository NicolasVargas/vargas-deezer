import { Component } from '@angular/core';
import { PrincipalService } from './core/principal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vargas-deezer';

  constructor(public principalService: PrincipalService) {}
}
