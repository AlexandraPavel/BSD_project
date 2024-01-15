import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from '../../../services/chart.service';
import { PieItem } from './side-view/ui/model/pie-item';
import { menu } from './menu';

@Component({
  selector: 'app-investement-page',
  templateUrl: './investement-page.component.html',
  styleUrls: ['./investement-page.component.css']
})
export class InvestementPageComponent {
  public elementlist: PieItem[] = menu;
  ngInit() {
    // console.log(this.elementlist)
  }
}
