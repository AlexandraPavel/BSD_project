import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from '../../../services/chart.service';
import { PieItem } from './side-view/ui/model/pie-item';
import { menu } from './menu';
import { InvestementService } from 'src/app/services/investement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-investement-page',
  templateUrl: './investement-page.component.html',
  styleUrls: ['./investement-page.component.css']
})
export class InvestementPageComponent implements OnInit {
  public elementlist: PieItem[] | undefined;
  id = -1;

  constructor(
    public investementServ: InvestementService,
    private userService: UserService) {}

  setElementList(list:PieItem[]) {
    this.elementlist = list as PieItem[];
    this.investementServ.setPies(list);
    console.log("Element List", this.elementlist)
  }
  
  ngOnInit(): void {
    const username: string = JSON.parse(localStorage.getItem('currentUser') || '').username || '';
    this.userService.getUserId(username).subscribe((response) => {
      this.id = response.id;
      this.investementServ.getPiesUser(response.id).subscribe((response) => {
        // console.log("hai omule", response)

        let list = response.map((pie:any) => {
          // console.log("pie.pieSlices[0]", pie.pieSlices[0])
          let coinName = []
          let coinInvestedMoney = []
          let coinReturnMoney = []
          let coinShares = []
          let totalMoney = 0
          let coins = []
          let pieName = pie.pieSlices[0].pie_name
          
          for (const [index, element] of pie.pieSlices.entries()) {
            coins.push({
              name: pie.pieSlices[index].ticker,
              price: pie.pieSlices[index].gainsPercentage,
              return: pie.pieSlices[index].invested_money
            })
            coinName.push(pie.pieSlices[index].ticker);
            coinInvestedMoney.push(pie.pieSlices[index].invested_money);
            coinReturnMoney.push(pie.pieSlices[index].invested_money);
            coinShares.push(pie.pieSlices[index].shares);
            totalMoney += pie.pieSlices[index].invested_money;
          }
          // console.log("coins", coins)
          // console.log("coinName", coinName)
          // console.log("coinInvestedMoney", coinInvestedMoney)
          // console.log("coinReturnMoney", coinReturnMoney)
          // console.log("coinShares", coinShares)
          // console.log("totalMoney", totalMoney)
          let myPie: PieItem = {
              displayName: pieName,
              currency: 'EUR',
              value: totalMoney,
              coins: coins,
            }
          return myPie;
          }
        )
        this.setElementList(list);
      })
    })
  }

}
