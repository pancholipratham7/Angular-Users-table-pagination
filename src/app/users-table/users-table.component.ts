import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Services/Data.service';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  providers:[DataService,ConfirmationService]
})
export class UsersTableComponent implements OnInit {
  users:any[];
  userId;
  allUsersData:any[];
  currentPage:number;
  perPage = 8;
  display:Boolean = false;
  @ViewChild('inputUsername') inputUsername:ElementRef;

  constructor(private ActivatedRoute:ActivatedRoute,private router:Router,private service:DataService,private confirmationService: ConfirmationService) {
    this.service = service;
    this.allUsersData = this.service.getData();
    this.users = this.allUsersData;
    this.currentPage = 1;
  }

  ngOnInit(): void {

    this.ActivatedRoute.queryParamMap.subscribe((param)=>{
      const usernameQuery = param.get('username');      
      // searching users with the username same as usernameQuery
      if(usernameQuery) {
        this.users = this.allUsersData.filter(user => {
          if(user.username.match(usernameQuery)) return user;
        })
        this.currentPage = 1;
      }
   
    })
  }

  onSearch() {
    this.router.navigate(['/dashboard/users'],{queryParams:{username:this.inputUsername.nativeElement.value}})
  }

  previousPage() {
    if(this.currentPage === 1) return;
    this.currentPage--;
    this.router.navigate(['/dashboard/users'],{queryParams:{page:this.currentPage}});
    
  }
  nextPage(){
    if(this.currentPage >= this.users.length/this.perPage) return;
    this.currentPage++;
    this.router.navigate(['/dashboard/users'],{queryParams:{page:this.currentPage}});
  }

  deleteUser(event:any) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the user?',
        accept: () => {
            
            const userId = event.target.closest('tr').dataset.id;
            this.users = this.users.filter(user => {
              if(user.id.toString() !== userId.toString()) return user; 
            })
            this.allUsersData = this.allUsersData.filter(user => {
              if(user.id.toString() !== userId.toString()) return user; 
            })

        },
        reject:() => {

        }
      });
  };

  openModal(event:any) {
    this.display = true;
    this.userId = event.target.closest('tr').dataset.id;
  }

  closeModal() {
    this.display = false;
  }

  updateUser(userData:any) {
    this.users = this.users.map(user => {
      if(user.id.toString() === userData.userId.toString()) {
        return {
          id:+user.id,
          username:userData.username,
          email:userData.email,
          contact:userData.contact,
          address:userData.address,
          role:userData.role
        }
      }else{
        return user;
      }
    }) 

    this.allUsersData = this.allUsersData.map(user => {
      if(user.id.toString() === userData.userId.toString()) {
        return {
          id:+user.id,
          username:userData.username,
          email:userData.email,
          contact:userData.contact,
          address:userData.address,
          role:userData.role
        }
      }else{
        return user;
      }
    }) 

    // closing the modal popup
    this.display = false;

  }

  }



