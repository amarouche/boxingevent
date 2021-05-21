import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, selectClubState} from '../../../store/app.states';
import {ActivatedRoute} from '@angular/router';
import {BoxerService} from '../../../services/boxer-service/boxer.service';
import {User, UserTypes} from '../../../models/user';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {

  club = null;
  submitted = false;
  clubState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private service: BoxerService) {
    this.clubState = this.store.select(selectClubState);
  }

  ngOnInit() {
    this.clubState.subscribe((state) => {
      this.club = state.currentClub;
    });
  }

  getBoxers() {
    return this.club.users.filter((user: User) => user.type.id === UserTypes.boxer);
  }
}
