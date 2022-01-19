import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../board-admin/userInfo';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser : any;
  user: UserInfo= new UserInfo;

  constructor(private token: TokenStorageService, private router: Router, private userSerive: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userSerive.getUser(this.token.getUser().id).subscribe(data=>{
      this.currentUser=data;
    })
    console.log(this.currentUser)
  }

  updateUser(id: number){
    this.router.navigate(['update-user', id])
  }

  changePassword(id: number){
    this.router.navigate(['change-password', id])
  }
}
