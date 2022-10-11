import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  
 users:User[] | any=[];
  
  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res=>{
      console.log(res);
      this.users=res;
      console.log(this.users)
    });
  }

  deleteUser(id:any,i:any){
    console.log(id);
    if(window.confirm("Are you sure you want to delete this user?")){
      this.userService.deleteUser(id).subscribe(res=>{
        this.users.splice(i, 1);
      });
    }
  }
  }

