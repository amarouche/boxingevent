import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification-service/notification.service';
import {ArticleService} from '../../services/article-service/article.service';
import {
  ArticleActionTypes,
  LoadArticleFromDB,
  LoadArticleFailure,
  LoadArticleSuccess,
  AddArticleFailure,
  AddArticleSuccess,
  PublishArticleFailure,
  AddArticle,
  PublishArticleSuccess,
  LoadArticlesSuccess,
  LoadArticlesFromDB,
  LoadArticlesFailure,
  LoadArticles,
  LoadArticlesFromDBSuccess,
  EditArticle,
  EditArticleSuccess,
  EditArticleFailure,
  LoadSlideArticlesSuccess, LoadSlideArticlesFromDB
} from '../actions/article.actions';
import {Article} from '../../models/article';

@Injectable()
export class ArticleEffects {

  constructor(private actions: Actions, private service: ArticleService, private router: Router,
              private notifyService: NotificationService) {

  }

  @Effect()
  AddArticle: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.ADD))
    .map((action: AddArticle) => action.payload)
    .switchMap((payload: FormData) => {
      return this.service.addArticle(payload)
        .map((article: Article) => {
          return new AddArticleSuccess(article);
        })
        .catch((error) => {
          return of(new AddArticleFailure(error));
        });
    });

  @Effect({dispatch: false})
  AddArticleFailure: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.ADD_FAILURE),
    tap((error) => {
      this.notifyService.showError('Echec de la sauvegarde', 'Erreur!');
    })
  );

  @Effect({dispatch: false})
  AddArticleSuccess: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.ADD_SUCCESS),
    tap((action: AddArticleSuccess) => {
      this.router.navigateByUrl('/preview-article/' + action.payload.id).then(() => {
        this.notifyService.showSuccess('Article sauvegardé', 'Ajout réussi');
      });
    })
  );

  @Effect()
  EditArticle: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.EDIT))
    .map((action: EditArticle) => action.payload)
    .switchMap((payload: FormData) => {
      return this.service.editArticle(payload)
        .map((article: Article) => {
          return new EditArticleSuccess(article);
        })
        .catch((error) => {
          return of(new EditArticleFailure(error));
        });
    });

  @Effect({dispatch: false})
  EditArticleFailure: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.EDIT_FAILURE),
    tap((error) => {
      this.notifyService.showError('Echec de la sauvegarde', 'Erreur!');
    })
  );

  @Effect({dispatch: false})
  EditArticleSuccess: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.EDIT_SUCCESS),
    tap((action: AddArticleSuccess) => {
      this.router.navigateByUrl('/article/' + action.payload.id).then(() => {
        this.notifyService.showSuccess('Article sauvegardé', 'Modification');
      });
    })
  );

  @Effect()
  PublishArticle: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.PUBLISH))
    .map((action: PublishArticleSuccess) => action.payload)
    .switchMap(payload => {
      return this.service.publish(payload)
        .map((article: Article) => {
          return new PublishArticleSuccess(article);
        })
        .catch((error) => {
          return of(new PublishArticleFailure(error));
        });
    });

  @Effect({dispatch: false})
  PublishArticleFailure: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.PUBLISH_FAILURE),
    tap((error) => {
      this.notifyService.showError('Echec de la publication', 'Erreur!');
    })
  );

  @Effect({dispatch: false})
  PublishArticleSuccess: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.PUBLISH_SUCCESS),
    tap((action: PublishArticleSuccess) => {
      this.router.navigateByUrl('/article/' + action.payload.id).then(() => {
        this.notifyService.showSuccess('Article publié', 'Succès');
      });
    })
  );

  @Effect()
  LoadArticle: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.LOAD))
    .map((action: LoadArticleFromDB) => action.payload)
    .switchMap(payload => {
      return this.service.getArticleFromStore(payload)
        .map((article) => {
          return new LoadArticleSuccess(article);
        })
        .catch((response) => {
          return of(new LoadArticleFromDB(payload));
        });
    });

  @Effect()
  LoadArticleFromDB: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.LOAD_FROM_DB))
    .map((action: LoadArticleFromDB) => action.payload)
    .switchMap(payload => {
      return this.service.getArticle(payload)
        .map((article) => {
          return new LoadArticleSuccess(article);
        })
        .catch((response) => {
          return of(new LoadArticleFailure(response.error));
        });
    });

  @Effect({dispatch: false})
  LoadArticleFailure: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.LOAD_FAILURE),
    tap((data) => {
      this.notifyService.showError('Article introuvable', 'Erreur!');
    })
  );

  @Effect()
  LoadArticles: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.LOAD_LIST))
    .map((action: LoadArticles) => action.payload)
    .switchMap(payload => {
      return this.service.getArticlesFromStore(payload)
        .map((data: any) => {
          return new LoadArticlesSuccess(data);
        })
        .catch((response) => {
          return of(new LoadArticlesFromDB(payload));
        });
    });

  @Effect()
  LoadArticlesFromDB: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.LOAD_LIST_FROM_DB))
    .map((action: LoadArticlesFromDB) => action.payload)
    .switchMap(payload => {
      return this.service.getArticles(payload)
        .map((data: any) => {
          return new LoadArticlesFromDBSuccess(data);
        })
        .catch((error) => {
          return of(new LoadArticlesFailure(payload));
        });
    });

  @Effect()
  LoadSlideArticles: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.LOAD_SLIDE_ARTICLES))
    .switchMap(() => {
      return this.service.getSlideArticlesFromStore()
        .map((data: any) => {
          return new LoadSlideArticlesSuccess(data);
        })
        .catch((response) => {
          return of(new LoadSlideArticlesFromDB());
        });
    });

  @Effect()
  LoadSlideArticlesFromDB: Observable<any> = this.actions.pipe(
    ofType(ArticleActionTypes.LOAD_SLIDE_ARTICLES_FROM_DB))
    .switchMap(() => {
      return this.service.getSlideArticles()
        .map((data: any) => {
          return new LoadSlideArticlesSuccess(data);
        })
        .catch((error) => {
          return of(new LoadArticlesFailure(error));
        });
    });


}
