import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { User } from '../../core/user';
import { UserResult } from '../user-result';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  destroySubject: Subject<boolean> = new Subject<boolean>();
  userName = new FormControl('');
  userResult: UserResult;
  users: User[] = [];
  loading: boolean;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userName.valueChanges
      .pipe(
        takeUntil(this.destroySubject),
        debounceTime(300),
        tap(() => this.loading = true),
        switchMap(newValue => this.userService.searchUser(newValue))
      )
      .subscribe((userResult: UserResult) => {
        this.loading = false;
        this.userResult = userResult;
        this.users = this.userResult.data;
      });
  }

  onSelectUser(user: User) {
    this.router.navigate([user.id, 'playlists']);
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
    this.destroySubject.unsubscribe();
  }
}
