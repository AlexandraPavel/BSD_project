import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { InvestementPageComponent } from './investement-page/investement-page.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
// import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  declarations: [
    //HomePageComponent,
    InvestementPageComponent,
    NotificationPageComponent,
    SettingsComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // SidebarComponent,
  ]
})
export class AdminModule { }
