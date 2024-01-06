import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalVisibility = new BehaviorSubject<boolean>(false);

  constructor(private authenticationService: AuthenticationService) {}

  showModal() {
    this.authenticationService.isLoggedIn$().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.modalVisibility.next(true);
      } else {
        // User not logged in; handle accordingly (e.g., redirect to login page)
      }
    });
  }

  hideModal() {
    this.modalVisibility.next(false);
  }

  getModalVisibility() : Observable<boolean> {
    return this.authenticationService.isLoggedIn$();
  }
}
