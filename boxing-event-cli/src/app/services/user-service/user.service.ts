import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {User} from '../../models/user';
import {BaseService} from '../base.service';
import {Store} from '@ngrx/store';
import {AppState, selectClubState} from '../../store/app.states';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
  private clubState: Observable<any>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    super();
    this.clubState = store.select(selectClubState);
  }

  public edit(data: FormData): Observable<any> {
    const url = `${this.BASE_URL}/users/${data.get('id')}`;
    return this.http.post<User>(url, data);
  }

  loadBoxer(id: number): Observable<User> {
    const boxer: User = this.loadBoxerFromStore(id);

    if (boxer == null) {
      const url = `${this.BASE_URL}/users/${id}`;
      return this.http.get(url);
    }

    return of(boxer);
  }

  loadBoxerFromStore(id: any): User {
    let currentBoxer: User = null;
    this.clubState.subscribe((state) => {
      if (state.currentClub) {
        state.currentClub.users.map((user: User) => {
          if (user.id === id) {
            currentBoxer = user;
          }
        });
      }
    });
    return currentBoxer;
  }
  getUsers(): Observable<User[]> {
    const url = `${this.BASE_URL}/users/`;
    return this.http.get<User[]>(url);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.BASE_URL}/users/${id}`;
    return this.http.get<User>(url);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.BASE_URL}/users/` + id;
    return this.http.delete(url, {headers: this.headers});
  }

}
