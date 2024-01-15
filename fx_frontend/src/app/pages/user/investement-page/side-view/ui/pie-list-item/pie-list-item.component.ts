import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PieItem } from '../model/pie-item';
// import { Router } from '@angular/router';
import { PieService } from '../service/pie.service';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChartService } from 'src/app/services/chart.service';


@Component({
    selector: 'app-pie-list-item',
    templateUrl: './pie-list-item.component.html',
    styleUrls: ['./pie-list-item.component.css'],
    animations: [
        trigger('indicatorRotate', [
            state('collapsed', style({ transform: 'rotate(0deg)' })),
            state('expanded', style({ transform: 'rotate(180deg)' })),
            transition('expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
            ),
        ])
    ]
})
export class PieListItemComponent implements OnInit {
    expanded = false;
    data = {}

    @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
    @Input() item!: PieItem;
    @Input() depth!: number;

  constructor(
    public pieService: PieService,
    public chartService: ChartService,
    
    // public router: Router,
    // private authService: AuthService,
    private dialog: MatDialog
    ) {

        if (this.depth === undefined) {
            this.depth = 0;
        }
    }

    ngOnInit(): void {
       
        // this.pieService.updateData()
        // getCurrentUrl().subscribe((url: string) => {
        //     if (this.item.route) {
        //         this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        //         this.ariaExpanded = this.expanded;
        //     }
        // });
    }

    onItemSelected(item: PieItem): void {
        this.dialog.closeAll();

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
}
