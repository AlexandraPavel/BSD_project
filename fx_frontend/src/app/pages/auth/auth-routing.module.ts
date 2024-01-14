import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { SigninComponent } from './signin/signin.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
// import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  { path: 'login', component: LoginPageComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterPageComponent, pathMatch: 'full' },
  // { path: '**',  redirectTo: '/login' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
