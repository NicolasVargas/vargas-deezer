import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, switchMap, debounce, debounceTime } from 'rxjs/operators';
import { UserService } from '../user.service';
import { UserResult } from '../user-result';
import { User } from '../user';
import { Principal } from 'src/app/core/principal';
import { PrincipalService } from 'src/app/core/principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.scss']
})
export class UserScreenComponent implements OnInit, OnDestroy {
  destroySubject: Subject<boolean> = new Subject<boolean>();
  userName = new FormControl('');
  userResult: UserResult;
  users: User[] = [];

  constructor(private userService: UserService,
    private principalService: PrincipalService,
    private router: Router) { }

  ngOnInit() {
    this.userName.valueChanges
      .pipe(
        takeUntil(this.destroySubject),
        debounceTime(300),
        switchMap(newValue => this.userService.searchUser(newValue))
      )
      .subscribe((userResult: UserResult) => {
        this.userResult = userResult;
        this.users = this.userResult.data;
      });
  }

  onSelectUser(user: User) {
    this.principalService.setPrincipal(user);
    this.router.navigate(['/playlists/', user.id]);
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }
}
