import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState, selectUserState} from '../../../store/app.states';
import {Observable} from 'rxjs';
import {LoadBoxer} from '../../../store/actions/user.actions';

@Component({
  selector: 'app-boxer-detail',
  templateUrl: './boxer-detail.component.html',
  styleUrls: ['./boxer-detail.component.css']
})
export class BoxerDetailComponent implements OnInit {

  userState: Observable<any>;
  boxer: User;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.userState = this.store.select(selectUserState);
  }

  ngOnInit() {
    this.userState.subscribe((state) => {
      this.boxer = state.selectedUser;
    });
    this.loadBoxer();
  }

  loadBoxer() {
    this.store.dispatch(new LoadBoxer(+this.route.snapshot.paramMap.get('id')));
  }
}
