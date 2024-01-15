import { HostBinding, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Component, Inject } from '@angular/core'; 
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import { ChartService } from 'src/app/services/chart.service';
import { PieItem } from '../ui/model/pie-item';
import { PieService } from '../ui/service/pie.service';
import { ProcentItem } from './model/procent-item';
// import { list } from './model/list';
import { ListService } from './service/list-slices.service';
import { ItemService } from './service/item-slice.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { InvestementService } from 'src/app/services/investement.service';
  
@Component({ 
  selector: 'app-dialog-create-pie', 
  templateUrl: 'dialog-create-pie.component.html', 
}) 
export class DialogCreatePie implements OnInit, OnDestroy {
  public list: ProcentItem[] | undefined;
  expanded = false;
  data_1 = {}
  saveButton = false;
  namePie = "";
  valueInvested = 0;
  savedNamePie = true;


  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000); 
  procent = new FormControl(0);
  totalProcent = 0;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() depth!: number;

  constructor(
    public pieService: PieService,
    public chartService: ChartService,
    private listService: ListService,
    private toastr: ToastrService,
    public investService: InvestementService,
    public dialogRef: MatDialogRef<DialogCreatePie>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dialogRef.updateSize('60vw', '40vw');
      if (this.depth === undefined) {
        this.depth = 0;
      }
     } 
  ngOnDestroy(): void {
    this.list = []
    // throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    // console.log(list)
   this.listService.list$.subscribe((list) => {
      this.list = list;
      this.calculateTotalProcent(list);
    });
  }

  private calculateTotalProcent(list: ProcentItem[]): void {
    this.totalProcent = list.map(item => parseInt(item.price, 10)).reduce((acc, currentValue) => acc + currentValue, 0);
    if (this.totalProcent > 100) {
      this.toastr.warning('Total percentage exceeds 100%', 'Warning');
      this.saveButton = true;
    } else
      this.saveButton = false;
  }

  onItemSelected(item: PieItem): void {
      // this.dialog.closeAll();

      if (!item.children || !item.children.length) {
          if (item.route) {
              this.pieService.updateData(item);
              // this.router.navigate([item.route]);
          }
      }

      if (item.children && item.children.length) {
          this.expanded = !this.expanded;
      }
  }



  onCancel(): void { 
    this.dialogRef.close();
    this.data.newPie = undefined;
  } 

  onAddSlice(): void {
    let entry: ProcentItem =
      {
        name : '',
        price : '0',
        return: 0
      }
    if (!this.list) {
      this.list = [];
    }
    // this.list.push(entry)
    console.log("entry", entry)
    this.listService.addSlice(entry);
  }

  onNamePieChange(event: Event): void {
    console.log("I did it",event.target)
    this.namePie = (event.target as HTMLInputElement).value;
  }

  onValueInvestedChange(event: Event): void {
    console.log("I did it",event.target)
    this.valueInvested = parseInt((event.target as HTMLInputElement).value, 10);
  }

  onSavePie(): void {
    if (!this.list) {
      this.list = [];
    }
    if (this.namePie != undefined && this.valueInvested != 0) {
      let pie: PieItem = {
        displayName: this.namePie,
        // disabled?: boolean;
        currency: 'EUR',
        value: this.valueInvested,
        coins: this.list,
        // route?: string;
        // children?: PieItem[];
      }
      this.data.newPie = pie;
    } else {
      // let 
      let pie: PieItem = {
        displayName: 'My NEW PIE',
        // disabled?: boolean;
        currency: 'EUR',
        value: 99,
        coins: this.list,
        // route?: string;
        // children?: PieItem[];
      }
      this.data.newPie = pie;
    }

    this.investService.sendPie(this.data.newPie).subscribe((response) => {
      console.log(response)
    })
  }
}