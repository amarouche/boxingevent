import {Action} from '@ngrx/store';

export enum ArticleActionTypes {
  ADD = '[Article] Add',
  ADD_SUCCESS = '[Article] Add Success',
  ADD_FAILURE = '[Article] Add Failure',
  EDIT = '[Article] Edit',
  EDIT_SUCCESS = '[Article] Edit Success',
  EDIT_FAILURE = '[Article] Edit Failure',
  LOAD = '[Article] Load One article From Store',
  LOAD_FROM_DB = '[Article] Load One article From DB',
  LOAD_SUCCESS = '[Article] Load one article From Store Success',
  LOAD_FAILURE = '[Article] Load one article from DB Failure',
  LOAD_LIST = '[Article] Load articles',
  LOAD_LIST_FROM_DB = '[Article] Load articles From DB',
  LOAD_SLIDE_ARTICLES = '[Article] Load slide articles',
  LOAD_SLIDE_ARTICLES_FROM_DB = '[Article] Load slide articles From DB',
  LOAD_LIST_SUCCESS = '[Article] Load articles Success',
  LOAD_SLIDE_ARTICLES_SUCCESS = '[Article] Load slide articles Success',
  LOAD_LIST_FROM_DB_SUCCESS = '[Article] Load articles From DB Success',
  LOAD_LIST_FAILURE = '[Article] Load articles from DB Failure',
  PUBLISH = '[Article] Publish',
  PUBLISH_SUCCESS = '[Article] Publish Success',
  PUBLISH_FAILURE = '[Article] Publish Failure',
}

export class AddArticle implements Action {
  readonly type = ArticleActionTypes.ADD;

  constructor(public payload: FormData) {
  }
}

export class AddArticleSuccess implements Action {
  readonly type = ArticleActionTypes.ADD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddArticleFailure implements Action {
  readonly type = ArticleActionTypes.ADD_FAILURE;

  constructor(public payload: any) {
  }
}

export class EditArticle implements Action {
  readonly type = ArticleActionTypes.EDIT;

  constructor(public payload: any) {
  }
}

export class EditArticleSuccess implements Action {
  readonly type = ArticleActionTypes.EDIT_SUCCESS;

  constructor(public payload: any) {
  }
}

export class EditArticleFailure implements Action {
  readonly type = ArticleActionTypes.EDIT_FAILURE;

  constructor(public payload: any) {
  }
}

export class LoadArticles implements Action {
  readonly type = ArticleActionTypes.LOAD_LIST;

  constructor(public payload: number) {
  }
}

export class LoadArticlesFromDB implements Action {
  readonly type = ArticleActionTypes.LOAD_LIST_FROM_DB;

  constructor(public payload: any) {
  }
}

export class LoadSlideArticles implements Action {
  readonly type = ArticleActionTypes.LOAD_SLIDE_ARTICLES;

  constructor() {
  }
}

export class LoadSlideArticlesFromDB implements Action {
  readonly type = ArticleActionTypes.LOAD_SLIDE_ARTICLES_FROM_DB;

  constructor() {
  }
}

export class LoadArticlesSuccess implements Action {
  readonly type = ArticleActionTypes.LOAD_LIST_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadArticlesFromDBSuccess implements Action {
  readonly type = ArticleActionTypes.LOAD_LIST_FROM_DB_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadSlideArticlesSuccess implements Action {
  readonly type = ArticleActionTypes.LOAD_SLIDE_ARTICLES_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadArticlesFailure implements Action {
  readonly type = ArticleActionTypes.LOAD_LIST_FAILURE;

  constructor(public payload: any) {
  }
}

export class LoadArticle implements Action {
  readonly type = ArticleActionTypes.LOAD;

  constructor(public payload: any) {
  }
}

export class LoadArticleFromDB implements Action {
  readonly type = ArticleActionTypes.LOAD_FROM_DB;

  constructor(public payload: any) {
  }
}

export class LoadArticleSuccess implements Action {
  readonly type = ArticleActionTypes.LOAD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadArticleFailure implements Action {
  readonly type = ArticleActionTypes.LOAD_FAILURE;

  constructor(public payload: any) {
  }
}

export class PublishArticle implements Action {
  readonly type = ArticleActionTypes.PUBLISH;

  constructor(public payload: any) {
  }
}

export class PublishArticleSuccess implements Action {
  readonly type = ArticleActionTypes.PUBLISH_SUCCESS;

  constructor(public payload: any) {
  }
}

export class PublishArticleFailure implements Action {
  readonly type = ArticleActionTypes.PUBLISH_FAILURE;

  constructor(public payload: any) {
  }
}

export type All =
  | AddArticle
  | AddArticleSuccess
  | AddArticleFailure
  | EditArticle
  | EditArticleSuccess
  | EditArticleFailure
  | LoadArticle
  | LoadArticleFromDB
  | LoadArticleSuccess
  | LoadArticleFailure
  | LoadArticles
  | LoadSlideArticles
  | LoadArticlesFromDB
  | LoadArticlesSuccess
  | LoadArticlesFailure
  | PublishArticle
  | PublishArticleSuccess
  | PublishArticleFailure
  | LoadArticlesFromDBSuccess
  | LoadSlideArticlesFromDB
  | LoadSlideArticlesSuccess
  ;
