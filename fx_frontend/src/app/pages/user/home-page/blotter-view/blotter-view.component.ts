import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TradeService } from '../../../../services/trade.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { prices } from 'src/app/constants';


@Component({
  selector: 'app-blotter-view',
  templateUrl: './blotter-view.component.html',
  styleUrls: ['./blotter-view.component.css']
})
export class BlotterViewComponent implements OnInit {

  filter = {
    ccyPair: '',
    date: 0
  };

  private unsubscribe = new Subject();
  transactions: Transaction[] = [];
  private initialTransactions: Transaction[] = [];

  currenciesPairs: (string | undefined)[] = [];

  constructor(
    private tradeService: TradeService
  ) { }

  ngOnInit() {
    this.startPooling();
  }


  startPooling(): void {
    this.tradeService.getTransactions()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => {
        console.log("Response", response)
        // Create transaction transform list by adding ccyPair
        const transactionsWithCcyPair: Transaction[] = response.pieSlices
          .map((res: any) => {
            // console.log(res);
            let company = res.ticker
            const foundItem = prices.find(item => item["Company Abvr"] === company);
            if (foundItem != undefined) {
              // console.log(this.currenciesPairs)
                let trans: Transaction = {
                  id: Math.random(),
                  username: 'elena',
                  primaryCcy: 'EUR',
                  secondaryCcy: 'USD',
                  rate: foundItem["Price"],
                  action: 'BUY',
                  notional: 10,
                  tenor: company,
                  date: 0,
                  ccyPair: 'EUR/USD'
                }
                return trans;
              }
            return res;
          })
        // });
        //     (transaction: { primaryCcy: any; secondaryCcy: any; }) => ({ ...transaction, ccyPair: `${transaction.primaryCcy}/${transaction.secondaryCcy}` }))
        this.transactions = transactionsWithCcyPair;
        this.initialTransactions = [...transactionsWithCcyPair];
        // // Get all Ccy pairs for select
        // this.currenciesPairs = this.transactions
        //   .map(transaction => transaction.ccyPair)
        //   .filter((x, i, a) => x && a.indexOf(x) === i);
        // this.filterBy();
      });
  }

  getDateWithoutHourAndMinuteAndSeconds(date: number) {
    return new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDay());
  }

  filterBy(): void {
    this.transactions = this.initialTransactions
      .filter(transaction =>
        this.filter.ccyPair && transaction.ccyPair === this.filter.ccyPair || !this.filter.ccyPair)
      .filter(transaction =>
        this.filter.date && this.getDateWithoutHourAndMinuteAndSeconds(transaction.date).getTime() === this.getDateWithoutHourAndMinuteAndSeconds(this.filter.date).getTime() || !this.filter.date)
  }

  ngOnDestroy() {
    this.unsubscribe.next('');
    this.unsubscribe.complete();
  }
}