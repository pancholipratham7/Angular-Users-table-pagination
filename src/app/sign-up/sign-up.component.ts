import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;

  constructor(private appRouter:Router) {

  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email:new FormControl("",[Validators.required, Validators.email,this.emailExists]),
      username:new FormControl("",[Validators.required, Validators.minLength(3),Validators.maxLength(25),this.usernameExists]),
      password:new FormControl("",[Validators.required,this.validatePassword])
    })
  } 

  onSubmit() {

    const newUser = {
      username:this.signUpForm.value.username,
      email:this.signUpForm.value.email,
      password:this.signUpForm.value.password
    }

    let usersArray = JSON.parse(localStorage.getItem('users'));
    usersArray.push(newUser);
    localStorage.setItem('users',JSON.stringify(usersArray));

    this.appRouter.navigateByUrl('/signin');

  }

  validatePassword(control:FormControl) {
    
    let passwordErrorCode = {
      password:true
    }


  const passwordErrorMsg = "Password must have between 8 and 20 characters, atleast one lowercase letter, one uppercase letter, one number";

  if(control.value.length < 8 || control.value.length > 20 ) { 
     
    return passwordErrorCode;

  } else if(control.value.search(/[a-z]/) < 0) { 
    
    return passwordErrorCode;

  } else if(control.value.search(/[A-Z]/) < 0) { 

    return passwordErrorCode;

  } else if(control.value.search(/[0-9]/) < 0) {
    return passwordErrorCode;
  } 

  return null;
  
}

usernameExists(control:FormControl) {
  let usernameExistsErrorCode = {
   usernameExists:true
  }
  
  const usersArray = JSON.parse(localStorage.getItem('users'));

  if(usersArray.length!==0 && usersArray.find(user=>user.username===control.value)) {
    return usernameExistsErrorCode
  }
  return null;
}

emailExists(control:FormControl) {
  let emailExistsErrorCode = {
    emailExists:true
   }
   
   const usersArray = JSON.parse(localStorage.getItem('users'));
 
   if(usersArray.length!==0 && usersArray.find(user=>user.email===control.value)) {
     return emailExistsErrorCode;
   }
   return null;
}

}