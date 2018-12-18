import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserResult } from './user-result';
import { User } from '../core/user';


describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    userService = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  describe('searchUser', () => {
    it('should return an observable of users', () => {
      // Arrange
      const userResult: UserResult = new UserResult([], 0);
      // Act
      userService.searchUser('myValue').subscribe(
        result => expect(result).toEqual(userResult)
      );

      // Assert
      const req = httpTestingController.expectOne(`https://api.deezer.com/search/user?q=myValue&limit=${userService['MAX_USERS']}`);

      req.flush(userResult);
    });
  });
  describe('getUser', () => {
    it('should fetch a user', () => {
      // Arrange
      const userResult: User = new User(1, 'Alice', 'url');
      // Act
      userService.getUser(1).subscribe(
        result => expect(result).toEqual(userResult)
      );

      // Assert
      const req = httpTestingController.expectOne('https://api.deezer.com/user/1');

      req.flush(userResult);
    });
  });
});
