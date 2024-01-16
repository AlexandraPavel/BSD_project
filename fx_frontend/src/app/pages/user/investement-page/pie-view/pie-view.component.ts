import { Component, Input, booleanAttribute } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from '../../../../services/chart.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PieService } from '../side-view/ui/service/pie.service';
import { PieItem } from '../side-view/ui/model/pie-item';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditPie } from './dialog-create-pie/dialog-edit-pie.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
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

  // public menu: PieItem[] = menu;
  animal: string | undefined;
  name: string | undefined;
  newPie: PieItem | undefined;

  totalAllocatedMoney = 0;
  noInvested = 0;
  totalHoldings = 0;
  totalInvestment = 0;
  totalReturn = 0;

  @Input({required: true}) item!: PieItem;
  @Input({transform: booleanAttribute}) itemAvailability!: boolean; // Second,
  constructor(
    private service: ChartService,
    private pieService: PieService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {
    this.changeData(this.item);
    // console.log("Item", this.item)
    this.pieService.data$.subscribe((newData) => {
      this.changeData(newData);
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

  
  getAllInvestments() {
    this.totalAllocatedMoney = 0;
    this.noInvested = 0;
    this.totalHoldings = 0;
    this.totalInvestment = 0;
    this.totalReturn = 0;
  }

  openEditPie(pie: PieItem): void {
    console.log("Edit Pie")
    const dialogRef = this.dialog.open(DialogEditPie, {
      width: '250px',
      data: { pie: pie, chart: this.chart }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
      // if (result != undefined)
      //   this.menu.push(result);
      
      console.log("this.newPie", result)
      // this.newPie = undefined;
      // this.animal = result;
    });
  }
}
