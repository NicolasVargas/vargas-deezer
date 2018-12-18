import { TestBed } from '@angular/core/testing';

import { PrincipalService } from './principal.service';
import { User } from './user';

describe('PrincipalService', () => {
  let service: PrincipalService;
  let initialUser;
  beforeEach(() => {
    initialUser = new User(0, 'user1', 'url');
    spyOn(window.localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(initialUser);
    });

    TestBed.configureTestingModule({ providers: [PrincipalService] });
    service = TestBed.get(PrincipalService);
  });

  it('should be created with principal retrieved from localstorage', () => {
    expect(service).toBeTruthy();
    expect(service['principal']).toBeTruthy();
  });

  it('should set Principal and save in localstorage', () => {
    // Arrange
    const user = new User(1, 'user1', 'url');
    const spySetItem = spyOn(window.localStorage, 'setItem');
    // Act
    service.setPrincipal(user);
    // Assert
    expect(service['principal'].id).toBe(user.id);
    expect(spySetItem).toHaveBeenCalled();
  });

  it('should get Principal', () => {
    // Arrange
    const user = new User(1, 'user1', 'url');
    service['principal'] = user;
    // Act
    const res = service.getPrincipal();
    // Assert
    expect(res).toBe(user);
  });

  describe('hasPrincipal', () => {
    it('should return true when has a principal', () => {
      // Arrange
      const user = new User(0, 'user1', 'url');
      service['principal'] = user;
      // Assert
      expect(service.hasPrincipal()).toBeTruthy();
    });

    it('should return false when has no principal', () => {
      delete service['principal'];
      // Assert
      expect(service.hasPrincipal()).toBeFalsy();
    });
  });

  it('should removePrincipal', () => {
    // Arrange
    const user = new User(0, 'user1', 'url');
    service['principal'] = user;
    // Act
    service.removePrincipal();
    const res = service.getPrincipal();
    // Assert
    expect(res).toBeFalsy();
  });
});
