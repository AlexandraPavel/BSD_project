import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { backendUrl } from '../constants';
import { ModalService } from './modal.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) { }


  // Method to update login status
  setLoggedIn(status: boolean) {
    this.isLoggedIn.next(status);
  }

  // Observable to track login status changes
  isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(backendUrl.authService.authenticate, { username: username, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
         
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('username', user.username);
          localStorage.setItem('email', user.email);
          localStorage.setItem('user_id', user.id);

        }
        this.setLoggedIn(true)
        return user;
      }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.setLoggedIn(false)
  }
}
