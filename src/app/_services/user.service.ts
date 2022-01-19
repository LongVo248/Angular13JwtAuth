import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../board-admin/userInfo';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/api/users/';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

// };

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService,
    private httpClient: HttpClientModule
  ) {}
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(id : number): Observable<any> {
    console.log(this.tokenService.getToken());
    return this.http.get<any>(API_URL + 'user/'+id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    console.log(this.tokenService.getToken());
    return this.http.get<any>(API_URL + 'admin', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(API_URL + 'admin/delete/' + id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }

  updateUserAdmin(id: number, user: UserInfo): Observable<any> {
    return this.http.put(API_URL + 'admin/update/' + id, JSON.stringify(user), {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }

  updateUser(id: number, user: UserInfo): Observable<any> {
    //console.log(id,user)
    return this.http.put(API_URL + 'user/update/' + id, JSON.stringify(user), {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }

  getUser(id: number): Observable<any> {
    return this.http.get(API_URL + 'user/' + id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }

  // updatePassword(id: number, password: string, newPassword: string): Observable<any>{
  //   return this.http.put(API_URL + 'user/change-password/'+id,password, newPassword,{
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.tokenService.getToken(),
  //     })
  //       .set('Content-Type', 'application/json')
  //       .set('Access-Control-Allow-Credential', 'true'),
  //   } );
  // }

  getUserAdmin(id: number): Observable<any> {
    return this.http.get(API_URL + 'admin/user/' + id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }
}
