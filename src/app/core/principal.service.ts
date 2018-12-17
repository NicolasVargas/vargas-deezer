import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private principal;

  constructor() { }

  setPrincipal(principal) {
    this.principal = Object.assign({}, principal);
  }

  getPrincipal() {
    return this.principal;
  }
}
