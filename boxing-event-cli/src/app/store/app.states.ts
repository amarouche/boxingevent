import * as auth from './reducers/auth.reducers';
import * as club from './reducers/club.reducers';
import * as article from './reducers/article.reducers';
import * as user from './reducers/user.reducers';
import {createFeatureSelector} from '@ngrx/store';

export interface AppState {
  authState: auth.State;
  articleState: article.State;
  clubState: club.State;
  userState: user.State;
}

export const reducers = {
  auth: auth.reducer,
  article: article.reducer,
  club: club.reducer,
  user: user.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectArticleState = createFeatureSelector<AppState>('article');
export const selectClubState = createFeatureSelector<AppState>('club');
export const selectUserState = createFeatureSelector<AppState>('user');
