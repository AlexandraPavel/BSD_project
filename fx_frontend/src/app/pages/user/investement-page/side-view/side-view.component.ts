// import { Component } from '@angular/core';
import { DialogCreatePie } from './dialog-create-pie/dialog-create-pie.component';
import { menu } from '../menu';
import { PieItem } from './ui/model/pie-item';
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InvestementService } from 'src/app/services/investement.service';
export interface DialogData {
  // animal: string;
  // name: string;
  newPie: PieItem;


  // totalAllocatedMoney: 0;
  // noInvested: 0;
  // totalHolding: 0;
  // totalInvestment: 0;
  // totalReturn: 0;
}


@Component({
  selector: 'app-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.css']
})
export class SideViewComponent {
  public menu: PieItem[] = menu;
  animal: string | undefined;
  name: string | undefined;
  newPie: PieItem | undefined;

  totalAllocatedMoney = 0;
  noInvested = 0;
  totalHoldings = 0;
  totalInvestment = 0;
  totalReturn = 0;

  constructor(
    public investementServ: InvestementService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.investementServ.pies.subscribe((elementList: PieItem[]) => {
      this.menu = elementList;  // Update the menu when the shared data changes
    });
  }


  getAllInvestments() {
    this.totalAllocatedMoney = 0;
    this.noInvested = 0;
    this.totalHoldings = 0;
    this.totalInvestment = 0;
    this.totalReturn = 0;
  }

  openCreatePie(): void {
    const dialogRef = this.dialog.open(DialogCreatePie, {
      width: '250px',
      data: { newPie: this.newPie}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
      if (result != undefined)
        this.menu.push(result);
      
      console.log("this.newPie", result)
      this.newPie = undefined;
      // this.animal = result;
    });
  }

}