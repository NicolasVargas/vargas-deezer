import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private principal;

  private readonly PRINCIPAL_STORAGE_KEY = 'NVD_PRINCIPAL';

  constructor() {
    const principal = JSON.parse(localStorage.getItem(this.PRINCIPAL_STORAGE_KEY));
    if (principal != null) {
      this.principal = principal;
    }
  }

  setPrincipal(principal) {
    this.principal = Object.assign({}, principal);
    localStorage.setItem(this.PRINCIPAL_STORAGE_KEY, JSON.stringify(this.principal));
  }

  getPrincipal() {
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
