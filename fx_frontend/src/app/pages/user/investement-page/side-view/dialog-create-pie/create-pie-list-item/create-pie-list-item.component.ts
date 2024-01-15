import { Component, HostBinding, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProcentItem } from '../model/procent-item';
import { MatDialog } from '@angular/material/dialog';
import { ChartService } from 'src/app/services/chart.service';
import { PieService } from '../../ui/service/pie.service';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
// import { ListService } from '../service/list.service'; // Import your ListService
import { ItemService } from '../service/item-slice.service';

@Component({
  selector: 'app-create-pie-list-item',
  templateUrl: './create-pie-list-item.component.html',
  styleUrls: ['./create-pie-list-item.component.css']
})
export class CreatePieListItemComponent implements OnInit, OnChanges {
  expanded = false;
  percent = 0;
  name = "";
  toppings = new FormControl('');
  previusValue = '0';

  toppingList: string[] = ["ADBE","AAPL","AMZN"];

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: ProcentItem;
  @Input() depth!: number;

  constructor(
    public pieService: PieService,
    public chartService: ChartService,
    private dialog: MatDialog,
    private itemService: ItemService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    console.log("Frate")
    this.percent = parseInt(this.item.price, 10);
    this.name = this.item.name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      // console.log("aici", this.item)
      this.itemService.updateData(this.item); 
    }
  }

  ngDoCheck() {
    
    if (this.item.price !== this.previusValue) {
      // console.log("changes")
      this.previusValue = this.item.price;
      this.itemService.updateData(this.item);
    }
  }
    
  formatLabel(percentage: string): string {
    return `${percentage}%`;
  }

  onItemSelected(item: ProcentItem): void {
    if (!item.children || !item.children.length) {
      if (item.return) {
        // Handle navigation or other logic if needed
      }
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  onDelete(item: any): void {
    // Implement deletion logic if needed
    this.itemService.deleteData(this.item);
  }

  onToppingsSelectionChange(event: MatSelectChange): void {
    this.item.name = event.value;
  }
}
