import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from 'src/app/models/transaction';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";

import { Rate } from 'src/app/models/rate';
import { backendUrl } from '../constants';

@Injectable()
export class TradeService {

  constructor(
    private http: HttpClient
  ) { }

  getTransactions() {
    return this.http.get<any>(backendUrl.quotaService.pieName+'IT') as Observable<any>
  }

  getTransactionsPolling(): Observable<any> {
    return interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.http.get<any>(backendUrl.quotaService.pieName+'IT'))
      );
  }
  saveTransaction(transaction: Transaction) {
    return this.http.post(backendUrl.quotaService.buy, transaction) as Observable<any>
  }

  getCurrencies() {
    return of(['EUR', 'USD', 'JPY', 'BTC', 'RON', 'GBT']) as Observable<string[]>;
    // this.http.get(backendUrl.quoteService.getCurrencies) as Observable<string[]>
  }

  getFxRate(primaryCcy: string, secondaryCcy: string) {
    return this.http.get(backendUrl.quoteService.getFxRate, { params: { primaryCcy, secondaryCcy } }) as Observable<Rate>
  }

  getFxRatePolling(primaryCcy: string, secondaryCcy: string) {
    return interval(2000)
        .pipe(
            startWith(0),
            switchMap(() => this.http.get(backendUrl.quoteService.getFxRate, { params: { primaryCcy, secondaryCcy } })
        )
    ) as Observable<Rate>
}
}