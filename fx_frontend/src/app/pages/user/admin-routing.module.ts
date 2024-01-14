import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { InvestementPageComponent } from './investement-page/investement-page.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'about',
  //   component: AboutComponent,
  //   pathMatch: 'full'
  // },
  { path: 'investement', component: InvestementPageComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'notification', component: NotificationPageComponent, canActivate: [AuthGuard],  pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
