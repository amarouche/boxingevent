import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, selectClubState, selectUserState} from '../../../store/app.states';
import {User} from '../../../models/user';
import {Club} from '../../../models/club';
import {AddBoxerToClub, AddNewBoxer} from '../../../store/actions/club.actions';
import {LoadIndependentBoxers} from '../../../store/actions/user.actions';
import {register} from 'ts-node';

declare var $: any;

@Component({
  selector: 'app-add-boxer',
  templateUrl: './add-boxer.component.html',
  styleUrls: ['./add-boxer.component.css']
})
export class AddBoxerComponent implements OnInit {

  boxers: User[];
  registerForm: FormGroup;
  submitted = false;
  userState: Observable<any>;
  clubState: Observable<any>;
  club: Club;
  selectedBoxer: User;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    this.userState = this.store.select(selectUserState);
    this.clubState = this.store.select(selectClubState);
  }

  ngOnInit() {
    this.clubState.subscribe((state) => {
      this.club = state.currentClub;
      this.closeModal();
      if (state.success) {
        this.loadBoxers();
      }
    });

    this.userState.subscribe((state) => {
      this.boxers = state.userList;
    });

    this.loadBoxers();
    this.initRegisterForm();
  }

  loadBoxers() {
    this.store.dispatch(new LoadIndependentBoxers());
  }

  get f() {
    return this.registerForm.controls;
  }

  initRegisterForm() { // TODO formatting user, set detail on a object
    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      weight: ['', Validators.required],
      height: ['', Validators.required]
    });
  }

  closeModal() {
    $('#addBoxerClubModal').modal('hide');
    if (this.registerForm && this.registerForm.valid) {
      $('#addClubMemberModal').modal('hide');
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const payload = this.registerForm.getRawValue();
    payload['detail'] = {
      height: payload.height,
      weight: payload.weight
    };
    this.store.dispatch(new AddNewBoxer({ clubId: this.club.id, boxer: payload}));
  }

  onAddBoxer(): void {
    this.store.dispatch(new AddBoxerToClub({clubId: this.club.id, boxerId: this.selectedBoxer.id}));
  }

  onSelectBoxer(boxer: User) {
    this.selectedBoxer = boxer;
  }

}
