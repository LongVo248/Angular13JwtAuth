import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from '../board-admin/userInfo';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  id: number=0;
  user: UserInfo = new UserInfo();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    if(this.token.getUser()){
      this.id= this.token.getUser().id;
      console.log(this.id, this.user)
    }
    this.userService.getUser(this.id).subscribe(data=>{
      this.user=data;
    }, error=>{
      console.log(error);
    })
  }

  onSubmit(){
    this.userService.updateUser(this.id, this.user).subscribe(
      (data) => {
        this.goToUserInfo();
      },
      (error) => console.log(error)
    );
  }

  goToUserInfo() {
    this.router.navigate(['profile']);
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }
}
