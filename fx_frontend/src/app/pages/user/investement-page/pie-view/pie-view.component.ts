import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from '../../../../services/chart.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PieService } from '../side-view/ui/service/pie.service';
import { PieItem } from '../side-view/ui/model/pie-item';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-pie-view',
  templateUrl: './pie-view.component.html',
  styleUrls: ['./pie-view.component.css']
})
export class PieViewComponent implements AfterViewInit {
  title = 'My Pie 1';
  chart: Chart<'pie', any, unknown> | undefined;
  result: any;
  coinPrice: any;
  coinName: any;
  coinReturn: any;
  holdingsMoney = 0;
  returnMoney = 0;
  backgroundColors: string[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource =  new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private service: ChartService,
    private pieService: PieService,
    private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



  ngOnInit() {
    this.pieService.data$.subscribe((newData) => {
      this.changeData(newData);
    });

    this.service.cryptoData().subscribe((res) => {
      this.result = res;
      this.coinPrice = this.result.data.coins.map((coins: any) => coins.price);
      this.coinName = this.result.data.coins.map((coins: any) => coins.name);

      this.backgroundColors = this.generateRandomColors(this.coinName.length);

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: this.coinName,
          datasets: [
            {
              data: this.coinPrice,
              borderColor: '#3e95cd',
              label: 'Coin Price',
              backgroundColor: this.backgroundColors, // Use the array of colors
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }


  ngOnDestroy() {
    // Ensure that the chart is destroyed when the component is destroyed
    if (this.chart) {
      this.chart.destroy();
    }
  }

  changeData(pie: PieItem) {
    this.coinPrice = pie.coins.map((item: any) => item.price);
    this.coinName = pie.coins.map((item: any) => item.name);
    this.coinReturn = pie.coins.map((item: any) => item.return);
    this.title = pie.displayName
    this.holdingsMoney = pie.value;
    this.returnMoney = pie.value;

    let newData = [];
    for (const [index, element] of pie.coins.entries()) {
      newData.push(
        {
          position: (index + 1),
          name: this.coinName[index],
          weight: this.coinPrice[index],
          symbol: this.coinReturn[index]
        })
    }
    this.dataSource = new MatTableDataSource(newData);

    this.backgroundColors = this.generateRandomColors(this.coinName.length);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: this.coinName,
        datasets: [
          {
            data: this.coinPrice,
            borderColor: '#3e95cd',
            label: 'Coin Price',
            backgroundColor: this.backgroundColors, // Use the array of colors
            borderWidth: 1,
          },
        ],
      },
    });
  }

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      colors.push(color);
    }
    return colors;
  }
}
