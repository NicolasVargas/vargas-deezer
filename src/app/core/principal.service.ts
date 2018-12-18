import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private principal: User;

  private readonly PRINCIPAL_STORAGE_KEY = 'NVD_PRINCIPAL';

  constructor() {
    const principal: User = <User>JSON.parse(localStorage.getItem(this.PRINCIPAL_STORAGE_KEY));
    if (principal != null) {
      this.principal = principal;
    }
  }

  setPrincipal(principal: User) {
    this.principal = <User>{...principal};
    localStorage.setItem(this.PRINCIPAL_STORAGE_KEY, JSON.stringify(this.principal));
  }

  getPrincipal(): User {
    return this.principal;
  }

  hasPrincipal(): boolean {
    return !!this.getPrincipal();
  }

  removePrincipal() {
    delete this.principal;
    localStorage.removeItem(this.PRINCIPAL_STORAGE_KEY);
  }
}
