import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SidebarModule} from 'primeng/sidebar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UsersTableComponent } from './users-table/users-table.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { PopupFormComponent } from './popup-form/popup-form.component';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {TabMenuModule} from 'primeng/tabmenu';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { AddUserPopupComponent } from './add-user-popup/add-user-popup.component';


const appRoutes:Routes = [
  {path:"",component:SignUpComponent},
  {path:"home",component:HomeComponent},
  {path:'signup',component:SignUpComponent},
  {path:'signin',component:SignInComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'dashboard',component:DashboardComponent,children:[
    {path:'users',component:UsersTableComponent},
    {path:'roles',component:RolesComponent}
  ]},
]

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    UsersTableComponent,
    PopupFormComponent,
    HomeComponent,
    RolesComponent,
    TabMenuComponent,
    AddUserPopupComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    AccordionModule,
    DropdownModule,
    TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
