import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { ProcentItem } from '../model/procent-item';
import { ListService2 } from './list-slices.service';

@Injectable({ providedIn: 'root' })
export class ItemService2 {
    private currentItem = new Subject<ProcentItem>();

    data$ = this.currentItem.asObservable();
    
    constructor(private listService: ListService2) {}

    updateData(newData: ProcentItem) {
        this.currentItem.next(newData);
        // console.log("Service updated Item", newData);

        // Update the list in ListService
        this.listService.updateList(newData);
    }

    deleteData(item: ProcentItem) {
        this.listService.deleteData(item);
    }
    
}
