import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminRoutingModule } from './admin-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { InvestementPageComponent } from './investement-page/investement-page.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';

import { NotificationPageComponent } from './notification-page/notification-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
// import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  declarations: [
    //HomePageComponent,
    InvestementPageComponent,
    NotificationPageComponent,
    SettingsModalComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule
    // SidebarComponent,
  ]
})
export class AdminModule { }
