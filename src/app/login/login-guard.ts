import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PrincipalService } from '../core/principal.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router, private principalService: PrincipalService) { }

    canActivate(): boolean {
        if (this.principalService.hasPrincipal()) {
            this.router.navigate([this.principalService.getPrincipal().id, 'playlists']);
            return false;
        }
        return true;
    }

}
