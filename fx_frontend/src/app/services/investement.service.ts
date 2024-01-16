import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl, prices } from '../constants';
import { concatMap, map, toArray } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { PieItem } from '../pages/user/investement-page/side-view/ui/model/pie-item';
import { ProcentItem } from '../pages/user/investement-page/side-view/dialog-create-pie/model/procent-item';

@Injectable({
  providedIn: 'root'
})
export class InvestementService {
  public pies:  BehaviorSubject<PieItem[]> = new BehaviorSubject<PieItem[]>([]);
  idUser = 0;

  setPies(list: PieItem[]): void {
    this.pies.next(list);
  }

  constructor(
    private http: HttpClient,
  ) { }


  getPiesUser(id: number) {
    // console.log("aici")
    this.idUser = id;
    return this.http.get<any>(backendUrl.quotaService.pieUser+id) as Observable<any>;
  }

 
  sendPie(pie: PieItem) {
    const pie_name = pie.displayName;
    const user_id = this.idUser;
    const listSlices = pie.coins;
    const totalMoney = pie.value;

    const requests = listSlices.map(element => {
      const company = (element as ProcentItem).name;
      const percent = (element as ProcentItem).price;
      const foundItem = prices.find(item => item["Company Abvr"] === company);

      if (foundItem != undefined) {
        const invested_money = (totalMoney * parseInt(percent, 10)) / 100;
        const shares = invested_money / foundItem["Price"];

        return this.http.post<any>(backendUrl.quotaService.buy, {
          pie_name: pie_name,
          user_id: user_id,
          ticker: company,
          invested_money: invested_money,
          shares: shares
        });
      }

    
      return new Observable();
    });

    return from(requests).pipe(
      concatMap(request => request),
      toArray() 
    );
  }

  editPie(pie: PieItem) {
    const pie_name = pie.displayName;
    const user_id = this.idUser;
    const listSlices = pie.coins;
    const totalMoney = pie.value;

    const requests = listSlices.map(element => {
      const company = (element as ProcentItem).name;
      const percent = (element as ProcentItem).price;
      const foundItem = prices.find(item => item["Company Abvr"] === company);

      if (foundItem != undefined) {
        const invested_money = (totalMoney * parseInt(percent, 10)) / 100;
        const shares = invested_money / foundItem["Price"];

        return this.http.post<any>(backendUrl.quotaService.sell, {
          pie_name: pie_name,
          user_id: user_id,
          ticker: company,
          invested_money: invested_money,
          shares: shares
        });
      }

    
      return new Observable();
    });

    return from(requests).pipe(
      concatMap(request => request),
      toArray() 
    );
  }

}
