import {Component, OnInit} from '@angular/core';
import {AppState, selectAuthState} from '../../store/app.states';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserService} from 'src/app/services/user-service/user.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../sign-up/_helpers/must-match.validator';
import {EditUser} from '../../store/actions/user.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {isNull} from 'util';

import {User} from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = null;
  profileForm: FormGroup;
  submitted = false;
  userState: Observable<any>;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private router: Router,
              private service: UserService,
              private route: ActivatedRoute) {
    this.userState = this.store.select(selectAuthState);
  }

  id = null;

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id , this.id);
    if (this.id !== 0) {
      this.service.getUser(this.id).subscribe((result: User) => {
        this.user = result;
        this.initForm();
      });
    } else {
      this.userState.subscribe((state) => {
        this.user = state.user;
        this.initForm();
      });
    }
  }

  get f() {
    return this.profileForm.controls;
  }

  onImageChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.profileForm.get('profilePicture').setValue(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    const formData: FormData = this.formattingData(this.profileForm.getRawValue());
    this.store.dispatch(new EditUser(formData));
  }

  formattingData(payload): FormData {
    const formData = new FormData();
    // Object.entries(payload).forEach(([key, value]) => formData.append(key, payload[key]));

    formData.append('id', payload.id);
    formData.append('lastName', payload.lastName);
    formData.append('firstName', payload.firstName);
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    if (payload.height &&  payload.weight) {
      formData.append('detail', JSON.stringify({
        'height': payload.height ? payload.height : 'N/C',
        'weight': payload.weight ? payload.weight : 'N/C'
      }));
    }

    // if (payload.profilePicture !== null) {
    //   formData.append('profilePicture', payload.profilePicture, payload.profilePicture.name);
    // }
  console.log(formData)
    return formData;
  }

  initForm() {
    const detail: any = this.user.detail != null ? this.user.detail : {weight: '', height: ''};
    this.profileForm = this.formBuilder.group({
      id: [this.user.id],
      lastName: [this.user.lastName, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      confirmPassword: [''],
      weight: [detail.weight, Validators.min(10)],
      height: [detail.height, Validators.min(100)],
      // profilePicture: []
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

}
