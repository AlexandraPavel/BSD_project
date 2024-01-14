import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideMainNavComponent } from './pages/side-main-nav/side-main-nav.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'user',
    children: [
      { path: '', loadChildren: () => import('./pages/user/admin.module').then(m => m.AdminModule) }
    ],
    component: SideMainNavComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
