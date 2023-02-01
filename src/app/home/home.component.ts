import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username:String;
  constructor(private router:Router) {
    this.username = sessionStorage.getItem('username');
  }

  onLogout() {
    sessionStorage.removeItem('username');
    this.router.navigate(['/signin']);
  }

}
