import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';
import { backendUrl } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | undefined;
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(backendUrl.authService.register, user) as any;
  }

  getUserId(userName : string) {
    return this.http.get<any>(backendUrl.authService.getUser+userName) as Observable<any>;
  }
}
