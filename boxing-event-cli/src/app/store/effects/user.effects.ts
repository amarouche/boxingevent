import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service/user.service';
import {
  EditUser,
  EditUserFailure,
  EditUserSuccess, LoadBoxer, LoadUserFailure, LoadUserListSuccess, LoadUserSuccess,
  UserActionTypes
} from '../actions/user.actions';
import {NotificationService} from '../../services/notification-service/notification.service';
import {BoxerService} from '../../services/boxer-service/boxer.service';


@Injectable()
export class UserEffects {

  constructor(private actions: Actions, private userService: UserService, private router: Router,
              private notifyService: NotificationService, private boxerService: BoxerService) {

  }

  @Effect()
  EditUser: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.EDIT))
    .map((action: EditUser) => action.payload)
    .switchMap((payload: FormData) => {
      return this.userService.edit(payload)
        .map((user) => {
          return new EditUserSuccess(user);
        })
        .catch((response) => {
          return Observable.of(new EditUserFailure(response.error));
        });
    });

  @Effect({dispatch: false})
  EditUserSuccess: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.EDIT_SUCCESS),
    tap(() => {
      this.notifyService.showSuccess('Données modifiées avec succès!', 'Bravo');
    })
  );

  @Effect({dispatch: false})
  EditUserFailure: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.EDIT_FAILURE),
    tap((response) => {
      this.notifyService.showFormError(response.payload);
    })
  );


  @Effect({dispatch: false})
  AddPictureFailure: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.EDIT_FAILURE),
    tap((response) => {
      this.notifyService.showFormError(response.payload);
    })
  );

  @Effect()
  LoadBoxer: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOAD_BOXER))
    .map((action: LoadBoxer) => action.payload)
    .switchMap(payload => {
      return this.userService.loadBoxer(payload)
        .map((user) => {
          return new LoadUserSuccess(user);
        })
        .catch((response) => {
          return Observable.of(new LoadUserFailure(response.error));
        });
    });

  @Effect({dispatch: false})
  LoadUserFailure: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOAD_FAILURE),
    tap((response) => {
      this.notifyService.showError('Utilisateur introuvable!', 'Erreur');
    })
  );

  @Effect()
  LoadIndependentBoxers: Observable<any> = this.actions.pipe(
    ofType(UserActionTypes.LOAD_INDEPENDENT_BOXERS))
    .switchMap(payload => {
      return this.boxerService.getBoxersWithoutClub()
        .map((user) => {
          return new LoadUserListSuccess(user);
        })
        .catch((response) => {
          return Observable.of(new LoadUserFailure(response.error));
        });
    });
}
