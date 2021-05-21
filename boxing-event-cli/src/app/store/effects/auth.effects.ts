import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess, SignUp, SignUpFailure, SignUpSuccess} from '../actions/auth.actions';
import {NotificationService} from '../../services/notification-service/notification.service';
import {LoadClub} from '../actions/club.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions: Actions, private authService: AuthService, private router: Router,
              private notifyService: NotificationService) {
  }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN))
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
        .map((user) => {
          return new LogInSuccess(user);
        })
        .catch((error) => {
          return Observable.of(new LogInFailure({error: error}));
        });
    });


  @Effect({dispatch: false})
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      this.authService.setToken(user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({dispatch: false})
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap(() => {
      this.notifyService.showError('Email/mot de passe incorrectes', 'Erreur');
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP))
    .map((action: SignUp) => action.payload)
    .switchMap(payload => {
      return this.authService.signUp(payload)
        .map((response) => {
          return new SignUpSuccess(response);
        })
        .catch((response) => {
          return Observable.of(new SignUpFailure(response.error));
        });
    });

  @Effect({dispatch: false})
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.notifyService.showSuccess('Vous pouvez vous connecter', 'Inscription réussie');
    })
  );

  @Effect({dispatch: false})
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE),
    tap((error) => {
      this.notifyService.showFormError(error.payload);
    })
  );

  @Effect({dispatch: false})
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.removeToken();
    })
  );
}

