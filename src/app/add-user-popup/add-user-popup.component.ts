import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../Services/Data.service';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.css'],
  providers:[DataService]
})
export class AddUserPopupComponent {
  popupForm:FormGroup;
  roles = [{name:'Admin',value:'Admin'},{name:'Developer',value:'Developer'},{name:'QA',value:'QA'}];
  showPopup:Boolean;
  allUsersData:any[];
  
  @Output()
  close:EventEmitter<string> = new EventEmitter<string>(); 
  @Output()
  add:EventEmitter<object> = new EventEmitter<object>();


  constructor(private service:DataService) {
    this.allUsersData = this.service.getData();
    console.log(this.allUsersData);
  }

  ngOnInit(): void {
    this.showPopup = true;
       this.popupForm = new FormGroup({
      username:new FormControl("",[Validators.required, Validators.minLength(3),Validators.maxLength(25),this.usernameExists.bind(this)]),
      email:new FormControl("",[Validators.required,Validators.email,this.emailExists.bind(this)]),
      address:new FormControl("",[Validators.required]),
      contact:new FormControl("",[Validators.required,Validators.minLength(10), Validators.pattern("^[0-9]*$"),Validators.maxLength(10)]),
      role:new FormControl("",[Validators.required])
    })

  }

  closePopup() {
    this.close.emit();
  }

  onSubmit(event:Event){
    event.preventDefault();

    // emitting the event to update the user
    this.add.emit({
      id:this.allUsersData.length,
      username: this.popupForm.value.username, 
      email:this.popupForm.value.email,
      address:this.popupForm.value.address,
      contact:this.popupForm.value.contact,
      role:this.popupForm.value.role
    })

  }

  usernameExists(control:FormControl) {
    let usernameExistsErrorCode = {
     usernameExists:true
    }
    
    const usersArray = this.allUsersData;
  
    if(usersArray.find(user=>user.username===control.value)) {
      return usernameExistsErrorCode
    }
    return null;
  }
  
  emailExists(control:FormControl) {
    let emailExistsErrorCode = {
      emailExists:true
     }
     
     const usersArray = this.allUsersData;
   
     if(usersArray.find(user=>user.email===control.value)) {
       return emailExistsErrorCode;
     }
     return null;
  }
}
