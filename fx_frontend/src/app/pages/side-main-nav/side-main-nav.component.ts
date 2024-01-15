import { Component, OnDestroy } from '@angular/core';
import { NavItem } from './ui/model/nav-item';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { menu } from './ui/model/menu';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SettingsModalService } from '../../services/settings-modal.service';

@Component({
  selector: 'app-side-main-nav',
  templateUrl: './side-main-nav.component.html',
  styleUrls: ['./side-main-nav.component.css']
})
export class SideMainNavComponent implements OnDestroy {

  public opened = true;
  private mediaWatcher: Subscription;
  public menu: NavItem[] = menu;

  constructor(
    private media: MediaObserver,
    private router: Router,
    private settingsModalService: SettingsModalService
    ) {
    this.mediaWatcher = this.media.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });
      
  }
  

  openSettingsModal() {
    this.settingsModalService.openSettingsModal();
  }

  private handleMediaChange(mediaChange: MediaChange): void {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  signout() {
    this.router.navigate(['/login'])
  }

  getEmailFromLocalStorage(): string | null {
    return localStorage.getItem('email');
  }
  
}
