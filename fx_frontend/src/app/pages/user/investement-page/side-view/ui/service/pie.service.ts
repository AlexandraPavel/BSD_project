import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { PieItem } from '../model/pie-item';

@Injectable({ providedIn: 'root' })
export class PieService {
    private currentPie = new Subject<PieItem>();

    data$ = this.currentPie.asObservable();

    updateData(newData: PieItem) {
        this.currentPie.next(newData);
      }

    // constructor(private router: Router) {
    //     this.router.events.subscribe((event: Event) => {
    //         if (event instanceof NavigationEnd) {
    //             this.currentUrl.next(event.urlAfterRedirects);
    //         }
    //     });
    // }

    // public getCurrentUrl(): BehaviorSubject<string> {
    //     if (!this.currentUrl.value) {
    //         // handles redirect after login
    //         const url = this.router.url;
    //         this.currentUrl.next(url);
    //     }

    //     return this.currentUrl;
    // }
}
