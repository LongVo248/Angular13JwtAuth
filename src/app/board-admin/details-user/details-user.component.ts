import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { UserInfo } from '../userInfo';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  id!: number;
  user!: UserInfo ;
  constructor(private route: ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
    this.user= new UserInfo();
    this.userService.getUser(this.id).subscribe(data=>{
      this.user=data;
      console.log(data)
    })
  }

}
