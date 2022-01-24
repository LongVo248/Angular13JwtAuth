import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  form: any = {
    email: null,
  };
  isSuccessful = false;
  isResetFailed = false;
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const {email} = this.form;
    this.authService.confirmEmail(email).subscribe((data)=>{
      this.isSuccessful = true;
      this.isResetFailed = false;
    },
    err => {
      this.errorMessage = err.error.message;
      this.isResetFailed = true;
    })

  }
}
