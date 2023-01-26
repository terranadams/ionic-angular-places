import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true

  get userIsAuthenticated() { // this is a safety measure, ensures this private variable doesn't get changed from other parts of our app, except through the use of these methods
    return this._userIsAuthenticated
  }

  constructor() { }

  login() {
    this._userIsAuthenticated = true
  }

  logout() {
    this._userIsAuthenticated = false
  }
}
