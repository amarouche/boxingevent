import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../store/app.states';
import {Observable} from 'rxjs';
import {LogOut} from '../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });
  }

  logout() {
    this.store.dispatch(new LogOut);
  }

}
