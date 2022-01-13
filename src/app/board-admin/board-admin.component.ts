import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserInfo } from './userInfo';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  userList: UserInfo[] = [];
  displayedColumns: string[] = [
    'username',
    'fullname',
    'email',
    'roles',
    'active',
  ];
  constructor(private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe((data) => {
      this.userList = data;
    });
  }

  getUserList(){
    this.userService.getAdminBoard().subscribe((data) => {
      this.userList = data;
    });
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(data=>{
      console.log(data)
      this.getUserList();
    })
  }

  detailsUser(id: number){
    this.router.navigate(['details-user', id])
  }

  updateUser(id: number){
    this.router.navigate(['update-user', id])
  }
}
