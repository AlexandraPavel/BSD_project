import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthGuard } from 'src/app/guards/auth.guard';
// import { TradeService } from './services/trade.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { NotificationPageComponent } from './pages/user/notification-page/notification-page.component';
import { InvestementPageComponent } from './pages/user/investement-page/investement-page.component';
import { HomePageComponent } from './pages/user/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SettingsComponent } from './pages/user/settings/settings.component';
import { ModalService } from './services/modal.service';
// import { NavbarComponent } from './pages/navbar/navbar.component';
// import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MenuListItemComponent } from './pages/side-main-nav/ui/menu-list-item/menu-list-item.component';
import { SideMainNavComponent } from './pages/side-main-nav/side-main-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    // LoginPageComponent,
    // RegisterPageComponent,
    // NotificationPageComponent,
    // InvestementPageComponent,
    // HomePageComponent,
    // NotFoundPageComponent,
    // SettingsComponent,
    SideMainNavComponent,
    MenuListItemComponent,
    // NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    // NavbarComponent,
    // SidebarComponent,
  ],
  providers: [
    UserService,
    AuthenticationService,
    AuthGuard,
    ModalService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
