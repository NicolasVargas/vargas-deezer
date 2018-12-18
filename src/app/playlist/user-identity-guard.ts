import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { PrincipalService } from '../core/principal.service';

@Injectable({
    providedIn: 'root',
})
export class UserIdentityGuard implements CanActivate {

    constructor(private router: Router, private principalService: PrincipalService) { }

    canActivate(): boolean {
        if (!this.principalService.getPrincipal()) {
            this.router.navigate(['users']);
            return false;
        }
        return true;
    }

}
