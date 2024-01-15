import { NgModule, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { InvestementPageComponent } from './investement-page/investement-page.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { ChartService } from '../../services/chart.service';
import { PieViewComponent } from './investement-page/pie-view/pie-view.component';
import { SideViewComponent } from './investement-page/side-view/side-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';

import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ModalService } from 'src/app/services/modal.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PieListItemComponent } from './investement-page/side-view/ui/pie-list-item/pie-list-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { PieService } from './investement-page/side-view/ui/service/pie.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { FormControl, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DialogCreatePie } from './investement-page/side-view/dialog-create-pie/dialog-create-pie.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePieListItemComponent } from './investement-page/side-view/dialog-create-pie/create-pie-list-item/create-pie-list-item.component';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ItemService } from './investement-page/side-view/dialog-create-pie/service/item-slice.service';
import { ListService } from './investement-page/side-view/dialog-create-pie/service/list-slices.service';
import { InvestementService } from 'src/app/services/investement.service';
// import { DialogEditPie } from './investement-page/pie-view/dialog-create-pie/dialog-edit-pie.component';

@NgModule({
  declarations: [
    HomePageComponent,
    InvestementPageComponent,
    NotificationPageComponent,
    SettingsComponent,
    NotFoundPageComponent,
    PieViewComponent,
    SideViewComponent,
    PieListItemComponent,
    DialogCreatePie,
    CreatePieListItemComponent,
    // DialogEditPie,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    // FormControl,
    AdminRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    // MatDialog,
    // MatDialogRef,
    // BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatTooltipModule,
  ],
  providers: [
    ChartService,
    ModalService,
    PieService,
    ItemService,
    ListService,
    InvestementService,
  ]
})
export class AdminModule { }
