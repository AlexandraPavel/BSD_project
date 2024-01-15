// import { Component } from '@angular/core';
import { DialogCreatePie } from './dialog-create-pie/dialog-create-pie.component';
import { menu } from './ui/model/menu';
import { PieItem } from './ui/model/pie-item';
import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;

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

  totalAllocatedMoney = 0;
  noInvested = 0;
  totalHoldings = 0;
  totalInvestment = 0;
  totalReturn = 0;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}


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
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}


// @Component({
//   selector: 'dialog-create-pie',
//   templateUrl: './dialog-create-pie.html',

//   // selector: 'app-side-view',
//   // templateUrl: './side-view.component.html',
//   // styleUrls: ['./side-view.component.css']
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
