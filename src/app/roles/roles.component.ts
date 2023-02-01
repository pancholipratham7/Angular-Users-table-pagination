import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles:any[];
  showPopup:Boolean;
  @ViewChild('inputRole') inputRole:ElementRef;
  @ViewChild('inputPermission') inputPermission:ElementRef;


  constructor() {
    this.showPopup = false;
    this.roles = [];
  } 
  ngOnInit(): void {
    
  }

  showRolePopup(){
    this.showPopup = true;
  }

  updateRole() {

    if(this.inputRole.nativeElement.value && this.inputPermission.nativeElement.value) {
      this.roles.push({
        name:this.inputRole.nativeElement.value,
        permissions:this.inputPermission.nativeElement.value
      })
    }
     this.showPopup = false;
   
  }

}
