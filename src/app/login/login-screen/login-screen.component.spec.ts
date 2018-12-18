import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { User } from '../../core/user';
import { UserResult } from '../user-result';
import { UserService } from '../user.service';
import { LoginScreenComponent } from './login-screen.component';


describe('LoginScreenComponent', () => {
  let component: LoginScreenComponent;
  let fixture: ComponentFixture<LoginScreenComponent>;
  let userService: UserService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginScreenComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatRippleModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatProgressSpinnerModule
      ],
      providers: [
        UserService
      ]
    })
      .compileComponents();

    userService = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find new user list', fakeAsync(() => {
    // Arrange
    const userResult = new UserResult([new User(0, 'user1', 'urlImg')], 1);
    spyOn(userService, 'searchUser').and.returnValue(of(userResult));
    // Act
    component.userName.setValue('newValue');
    tick(300);
    fixture.detectChanges();
    // Assert
    expect(component.users).toEqual(userResult.data);
    expect(component.userResult).toEqual(userResult);
  }));
});
