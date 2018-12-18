import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PrincipalService } from '../core/principal.service';
import { User } from '../login/user';
import { UserService } from '../login/user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class PlaylistsResolver implements Resolve<User> {

    constructor(private userService: UserService, private principalService: PrincipalService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService
            .getUser(+route.paramMap.get('userId'))
            .pipe(
                tap((user: User) => this.principalService.setPrincipal(user))
            );
    }

}
