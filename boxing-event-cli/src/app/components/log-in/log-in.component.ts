import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../store/app.states';
import {LogIn} from '../../store/actions/auth.actions';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {LoadClub} from '../../store/actions/club.actions';

declare var $: any;

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  user: User = new User();
  loginForm: FormGroup;
  authState: Observable<any>;
  submitted = false;
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.authState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
    this.authState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.closeModal();
      this.loadUserClub();
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const payload = this.loginForm.getRawValue();
    this.store.dispatch(new LogIn(payload));
  }

  closeModal() {
    if (this.isAuthenticated) {
      $('#loginModal').modal('hide');
    }
  }

  loadUserClub() {
    if (this.isAuthenticated) {
      this.store.dispatch(new LoadClub());
    }
  }


}
