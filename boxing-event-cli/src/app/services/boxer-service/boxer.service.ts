import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class BoxerService extends BaseService {

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  constructor(private http: HttpClient) {
    super();
  }

  getBoxer(id: string): Observable<User> {
    const url = `${this.BASE_URL}/users/${id}`;
    return this.http.get<User>(url);
  }

  getBoxersByClub(id: string): Observable<User[]> {
    const url = `${this.BASE_URL}/boxers/all/club/${id}`;
    return this.http.get<User[]>(url);
  }

  getBoxersWithoutClub(): Observable<User[]> {
    const url = `${this.BASE_URL}/boxers/free`;
    return this.http.get<User[]>(url);
  }

  addBoxerToClub(payload: any): Observable<any> {
    const url = `${this.BASE_URL}/clubs/${payload.clubId}/add-boxer`;
    return this.http.post<any>(url, {id: payload.boxerId});
  }

  addNewBoxer(payload: any): Observable<any> {
    const url = `${this.BASE_URL}/clubs/${payload.clubId}/create-boxer`;
    return this.http.post<any>(url, payload.boxer);
  }
}
