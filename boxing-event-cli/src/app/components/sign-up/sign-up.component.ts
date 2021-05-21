import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../store/app.states';
import {SignUp} from '../../store/actions/auth.actions';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from './_helpers/must-match.validator';
import {IUserType} from '../../models/user';

declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerMemberForm: FormGroup;
  submitted = false;
  getState: Observable<any>;
  errorMessage: string | null;
  userTypes: IUserType[];

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.closeModal();
    });
    this.initRegisterMemberForm();
    this.userTypes = [
      {id: 1, name: 'Spectateur'},
      {id: 2, name: 'Boxeur'}
    ];
  }

  get f() {
    return this.registerMemberForm.controls;
  }

  get userType(): any {
    return this.registerMemberForm.get('type');
  }


  onMemberSubmit(): void {
    this.submitted = true;
    if (this.registerMemberForm.invalid) {
      return;
    }
    const payload = this.registerMemberForm.getRawValue();
    this.store.dispatch(new SignUp(payload));
  }


  initRegisterMemberForm() {
    this.registerMemberForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      type: [this.userTypes, Validators.required],
      weight: [''],
      height: [''],
      profilePic: [null]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onImageChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.registerMemberForm.patchValue({
          profilePic: reader.result
        });
      };
    }
  }

  closeModal() {
    if (this.registerMemberForm && this.registerMemberForm.valid) {
      $('#signupModal').modal('hide');
    }
  }

}
