import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {}
  // infoUser = this.fb.group({
  //   email: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern('^[a-z0-9](.?[a-z0-9]){0,}@g(oogle)?mail.com$'),
  //     ],
  //   ],
  // });
  ngOnInit(): void {}

  onSubmit(): void {
    const { username, firstname, lastname, email, password } = this.form;

    this.authService
      .register(username, firstname, lastname, email, password)
      .subscribe(
        (data) => {
          // console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }
}
