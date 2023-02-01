import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../Services/Data.service';

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css'],
  providers:[DataService]
})
export class PopupFormComponent implements OnInit {
  popupForm:FormGroup;
  roles = [{name:'Admin',value:'Admin'},{name:'Developer',value:'Developer'},{name:'QA',value:'QA'}];
  @Input() userId;
  showPopup:Boolean;
  @Output()
  close:EventEmitter<string> = new EventEmitter<string>(); 
  @Output()
  update:EventEmitter<object> = new EventEmitter<object>();

  constructor(private service:DataService) {
  }

  ngOnInit(): void {
    this.showPopup = true;
    const userData = this.service.getData().find( user => user.id.toString() === this.userId);
    console.log(userData);


    this.popupForm = new FormGroup({
      username:new FormControl(userData.username,[Validators.required, Validators.minLength(3),Validators.maxLength(25)]),
      email:new FormControl(userData.email,[Validators.required,Validators.email]),
      address:new FormControl(userData.address,[Validators.required]),
      contact:new FormControl(userData.contact,[Validators.required,Validators.minLength(10), Validators.pattern("^[0-9]*$"),Validators.maxLength(10)]),
      role:new FormControl(userData.role,[Validators.required])
    })

  }

  closePopup() {
    this.close.emit();
  }

  onSubmit(event:Event){
    event.preventDefault();

    // emitting the event to update the user
    this.update.emit({
      userId : this.userId,
      username: this.popupForm.value.username, 
      email:this.popupForm.value.email,
      address:this.popupForm.value.address,
      contact:this.popupForm.value.contact,
      role:this.popupForm.value.role
    })

  }

 


}
