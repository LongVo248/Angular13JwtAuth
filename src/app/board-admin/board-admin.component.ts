import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserInfo } from './userInfo';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PagerService } from '../_services/pager.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  userList: UserInfo[] = [];
  displayedColumns: string[] = [
    'username',
    'firstname',
    'lastname',
    'email',
    'roles',
    'active',
  ];
  dataSource!: MatTableDataSource<UserInfo>;
  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private pagerService: PagerService
  ) {
    this.userService.getAdminBoard().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.userService.getAdminBoard().subscribe((data) => {
      this.dataSource = new MatTableDataSource<UserInfo>(data);
      this.userList = data;
    });
  }

  getUserList() {
    this.userService.getAdminBoard().subscribe((data) => {
      this.userList = data;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data) => {
      this.getUserList();
    });
    this.reloadPage();
  }

  detailsUser(id: number) {
    this.router.navigate(['details-user', id]);
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  addUser() {
    this.router.navigate(['add-user']);
  }
  reloadPage(): void {
    window.location.reload();
  }
}
