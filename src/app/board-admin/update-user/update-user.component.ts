import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { UserInfo } from '../userInfo';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  id!: number;
  user: UserInfo = new UserInfo();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];

    this.userService.getUser(this.id).subscribe(data=>{
      this.user=data;
    }, error=>{
      console.log(error);
    })
  }

  onSubmit() {
    this.userService.updateUser(this.id, this.user).subscribe(
      (data) => {
        this.goToUserList();
      },
      (error) => console.log(error)
    );
  }

  goToUserList() {
    this.router.navigate(['admin']);
  }
}
