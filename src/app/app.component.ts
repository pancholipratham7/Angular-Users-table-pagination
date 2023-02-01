import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  
  ngOnInit() {
    const usersArray = localStorage.getItem('users');
    if(!usersArray || usersArray.length === 0) {
      localStorage.setItem('users',JSON.stringify([{username:'pratham12',email:'pratham123@gmail.com',password:"Pratham12345"}]));
    }
  }

}
