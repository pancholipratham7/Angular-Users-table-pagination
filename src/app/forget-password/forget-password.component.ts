import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  myForm:FormGroup;
  errorHead:String;

  ngOnInit() {
    this.myForm = new FormGroup({
      username:new FormControl("",[Validators.required,this.usernameFound]),
      email:new FormControl("",[Validators.required,this.emailFound]),
      password:new FormControl("",[Validators.required,this.validatePassword]),
    })
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

usernameFound(control:FormControl) {

  const errorCode = {
    usernameExists:true
  }

  const usersArray = JSON.parse(localStorage.getItem('users'));

  const userNameFound = usersArray.find(user => user.username === control.value);

  if(userNameFound) return null;

  return errorCode;
}

emailFound(control:FormControl) {
  const errorCode = {
    emailExists:true
  }

  const usersArray = JSON.parse(localStorage.getItem('users'));

  const emailFound = usersArray.find(user => user.email === control.value);

  if(emailFound) return null;

  return errorCode;
}

onSubmit() {

  console.log("Form submitted");

  let usersArray = JSON.parse(localStorage.getItem('users'));

  let userFound = false;
  let samePassword = false;

  usersArray = usersArray.map(user=>{
    if( user.username === this.myForm.value.username && user.email===this.myForm.value.email ) {
      userFound = true;
      if(user.password === this.myForm.value.password) {
          samePassword = true; 
          return user;         
      }

      return {
        username:user.username,
        email:user.email,
        password:this.myForm.value.password
      }

    }
    return user;
  })

  if(userFound && samePassword) {
    this.errorHead = "New password cannot be same as old password!";
    return;
  }
  else if(!userFound) {
    this.errorHead = "Wrong Credentials!";
    return;
  }

  localStorage.setItem('users',JSON.stringify(usersArray));

}

}
