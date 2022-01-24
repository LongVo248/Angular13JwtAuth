import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserInfo } from 'src/app/board-admin/userInfo';
import Validation from './validation';
import { UserService } from 'src/app/_services/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { EncrDecrService } from 'src/app/_services/encr-decr.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  id: number = 0;
  pass: string = '';
  newPass: string = '';
  currentUser: any;
  isSuccessful = false;
  errorMessage = '';
  isChangeFail = false;
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private token: TokenStorageService,
    private EncrDecr: EncrDecrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('newPassword', 'confirmPassword')],
      }
    );
    // var encrypted= this.EncrDecr.set('123456$#@$^@1ERF',this.form.value.password)
    // var decrypted= this.EncrDecr.get('123456$#@$^@1ERF',encrypted)
    // console.log('Encrypted:'+encrypted)
    // console.log('Encrypted:'+decrypted)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.id = this.token.getUser().id;
    this.pass = this.form.value.password;
    this.newPass = this.form.value.newPassword;
    this.userService.checkPassword(this.id, this.pass).subscribe(
      (data) => {
        console.log(data);
        console.log(this.id, this.pass, this.newPass);
        if(data== true){
          this.userService
          .updatePassword(this.id, this.newPass)
          .subscribe((data) => {
            this.isSuccessful = true;
            this.isChangeFail = false;
          },
          (err) => {
            this.errorMessage = err.error.message;
            this.isChangeFail = true;
          });
        } else{
          this.isSuccessful = false;
          this.isChangeFail = true;
        }
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isChangeFail = true;
      }
    );
    // console.log(JSON.stringify(this.form.value, null, 2));
    // this.id = this.token.getUser().id;
    // this.pass = this.form.value.password;

    // this.userService.getUser(this.id).subscribe((data) => {
    //   this.currentUser = data.password;
    //   console.log(this.currentUser);
    // });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
