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

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
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

  updateUser(id: number, user: UserInfo ): Observable<any>{
    return this.http.put(API_URL+'admin/update/'+id, user,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    } );
  }

  getUser(id: number): Observable<any>{
    return this.http.get(API_URL+'admin/user/'+id,{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    })
  }
}
