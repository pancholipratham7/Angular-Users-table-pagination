import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm:FormGroup;
  errorHead:Boolean;

  constructor(private router:Router) {

  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      username:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required])
    })
    this.errorHead = false;
  } 

  onSubmit() {
    console.log('HI');
    let usersArray = JSON.parse(localStorage.getItem('users'));
    console.log(this.signInForm.value.username,this.signInForm.value.password)
    const userFound = usersArray.find(user => user.username===this.signInForm.value.username && user.password===this.signInForm.value.password);
    
    if(!userFound) {
      this.errorHead = true;
      return;
    }

    // storing the session
    sessionStorage.setItem("username",this.signInForm.value.username);
    this.router.navigate(['/home']);    
  }
  
  

}
