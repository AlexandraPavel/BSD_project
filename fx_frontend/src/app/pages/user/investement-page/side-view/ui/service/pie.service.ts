import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PieItem } from '../model/pie-item';

@Injectable({ providedIn: 'root' })
export class PieService {
    private currentPie = new Subject<PieItem>();

    data$ = this.currentPie.asObservable();

    updateData(newData: PieItem) {
        // print()
        this.currentPie.next(newData);
      }

}
