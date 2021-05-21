import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {User} from '../../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Club} from '../../models/club';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../store/app.states';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService extends BaseService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
  private user: User;
  userState: Observable<any>;

  constructor(private store: Store<AppState>, private http: HttpClient) {
    super();
    this.userState = this.store.select(selectAuthState);
    this.userState.subscribe((state) => {
      this.user = state.user;
    });
  }

  addClub(payload: Club): Observable<any> {
    const url = `${this.BASE_URL}/clubs/user/${this.user.id}`;
    return this.http.post<Club>(url, payload, {headers: this.headers});
  }

  editClub(club: Club): Observable<any> {
    const url = `${this.BASE_URL}/clubs/${club.id}`;
    return this.http.put<Club>(url, club, {headers: this.headers});
  }

  getUserClub(): Observable<Club> {
    if (!this.user.clubs || this.user.clubs.length === 0) { // TODO get club from user
      return throwError('no item in store');
    }
    return this.getClubData(this.user.clubs[0].id);
  }

  getClubData(id: number): Observable<Club> {
    const url = `${this.BASE_URL}/clubs/${id}`;
    return this.http.get(url);
  }
}
