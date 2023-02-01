import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {
  tabs: MenuItem[];
  activeItem: MenuItem;
  username:string;

  constructor(private router:Router) {
    const username = sessionStorage.getItem('username');
    if(!username) this.router.navigate(['/signin']);
    this.username = username;
  }

    ngOnInit() {
        this.tabs = [
            {label: 'Users', icon: 'pi pi-fw pi-users'},
            {label: 'Roles', icon: 'pi pi-fw pi-calendar'},
        ];

        this.activeItem = this.tabs[0];
    }

    onTabChange(event:any) {
      if(event.label === 'Users') {
        this.router.navigate(['/dashboard/users']);
      }else if(event.label==='Roles'){
        this.router.navigate(['/dashboard/roles']);
      }
    }

    logoutHandler() {
      sessionStorage.removeItem('username');
      this.router.navigate(['/signin']);
    }

}
