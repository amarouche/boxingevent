import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  AddBoxerFailure,
  AddBoxerSuccess,
  AddClub,
  AddClubFailure,
  AddClubSuccess,
  ClubActionTypes,
  EditClub,
  EditClubFailure,
  EditClubSuccess, LoadClubFailure,
  LoadClubSuccess
} from '../actions/club.actions';
import {tap} from 'rxjs/operators';
import {ClubService} from '../../services/club-service/club.service';
import {NotificationService} from '../../services/notification-service/notification.service';
import {BoxerService} from '../../services/boxer-service/boxer.service';


@Injectable()
export class ClubEffects {

  constructor(private actions: Actions, private clubService: ClubService,
              private notifyService: NotificationService, private boxerService: BoxerService) {

  }

  @Effect()
  AddClub: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.ADD))
    .map((action: AddClub) => action.payload)
    .switchMap(payload => {
      return this.clubService.addClub(payload)
        .map((club) => {
          return new AddClubSuccess(club);
        })
        .catch((response) => {
          return of(new AddClubFailure(response.error));
        });
    });

  @Effect({dispatch: false})
  AddClubSuccess: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.ADD_SUCCESS),
    tap(() => {
      this.notifyService.showSuccess('Votre club a bien été créé', 'Bravo!');
    })
  );

  @Effect({dispatch: false})
  AddClubFailure: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.ADD_FAILURE),
    tap((error) => {
      this.notifyService.showFormError(error.payload);
    })
  );

  @Effect()
  EditClub: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.EDIT))
    .map((action: EditClub) => action.payload)
    .switchMap(payload => {
      return this.clubService.editClub(payload)
        .map((club) => {
          return new EditClubSuccess(club);
        })
        .catch((response) => {
          return of(new EditClubFailure(response.error));
        });
    });

  @Effect({dispatch: false})
  EditClubSuccess: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.EDIT_SUCCESS),
    tap(() => {
      this.notifyService.showSuccess('Données modifiées avec succès!', 'Bravo');
    })
  );

  @Effect({dispatch: false})
  EditClubFailure: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.EDIT_FAILURE),
    tap((error) => {
      this.notifyService.showFormError(error.payload);
    })
  );

  @Effect()
  LoadClub: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.LOAD))
    .switchMap(payload => {
      return this.clubService.getUserClub()
        .map((club) => {
          return new LoadClubSuccess(club);
        })
        .catch((error) => of(new LoadClubFailure(error)));
    });

  @Effect({dispatch: false})
  LoadClubFailure: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.LOAD_FAILURE),
    tap(() => {
      console.log('user has no club');
    })
  );

  @Effect()
  AddBoxerToClub: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.ADD_BOXER_TO_CLUB))
    .map((action: AddClub) => action.payload)
    .switchMap(payload => {
      return this.boxerService.addBoxerToClub(payload)
        .map((club) => {
          return new AddBoxerSuccess(club);
        })
        .catch((response) => {
          return of(new AddBoxerFailure(response.error));
        });
    });

  @Effect()
  AddNewBoxer: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.ADD_NEW_BOXER))
    .map((action: AddClub) => action.payload)
    .switchMap(payload => {
      return this.boxerService.addNewBoxer(payload)
        .map((club) => {
          return new AddBoxerSuccess(club);
        })
        .catch((response) => {
          return of(new AddBoxerFailure(response));
        });
    });

  @Effect({dispatch: false})
  AddBoxerSuccess: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.ADD_BOXER_SUCCESS),
    tap(() => {
      this.notifyService.showSuccess('Boxeur ajouté avec succès!', 'Bravo');

    })
  );

  @Effect({dispatch: false})
  AddBoxerFailure: Observable<any> = this.actions.pipe(
    ofType(ClubActionTypes.ADD_BOXER_FAILURE),
    tap((error) => {
      this.notifyService.showFormError(error.payload.error);
    })
  );

}
