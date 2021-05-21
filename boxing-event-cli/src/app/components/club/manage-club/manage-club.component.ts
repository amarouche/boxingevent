import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectClubState} from '../../../store/app.states';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../services/notification-service/notification.service';
import {EditClub} from '../../../store/actions/club.actions';
import {User, UserTypes} from '../../../models/user';

@Component({
  selector: 'app-manage-club',
  templateUrl: './manage-club.component.html',
  styleUrls: ['./manage-club.component.css']
})
export class ManageClubComponent implements OnInit {

  club = null;
  clubForm: FormGroup;
  submitted = false;
  clubState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private route: ActivatedRoute,
              private notifyService: NotificationService) {
    this.clubState = this.store.select(selectClubState);
  }

  ngOnInit() {
    this.clubState.subscribe((state) => {
      this.club = state.currentClub;
      this.initClubForm();
    });
  }

  initClubForm() {
    this.clubForm = this.formBuilder.group({
      id: [this.club.id],
      name: [this.club.name, Validators.required],
      email: [this.club.email, [Validators.required, Validators.email]],
      address: [this.club.address, Validators.required],
      zipCode: [this.club.zipCode, Validators.required],
    });
  }

  get f() {
    return this.clubForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.clubForm.invalid) {
      return;
    }
    const payload = this.clubForm.getRawValue();
    this.store.dispatch(new EditClub(payload));
  }

  getBoxers() {
    return this.club.users.filter((user: User) => user.type.id === UserTypes.boxer);
  }
}
