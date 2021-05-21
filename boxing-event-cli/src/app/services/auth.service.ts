import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  constructor(private http: HttpClient) {
    super();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/auth`;
    return this.http.post<User>(url, {email: email, password: password});
  }

  signUp(user: User): Observable<any> {
    const url = `${this.BASE_URL}/users/new/type/${user.type}`;
    delete user.type; // TODO find a best way
    return this.http.post<User>(url, user, {headers: this.headers});
  }

}
