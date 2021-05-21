import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState, selectArticleState} from '../../store/app.states';
import {Article} from '../../models/article';
import {BaseService} from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService {

  private articleState: Observable<any>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    super();
    this.articleState = store.select(selectArticleState);
  }

  addArticle(data): Observable<any> {
    const url = `${this.BASE_URL}/articles`;
    return this.http.post<any>(url, data);
  }

  getArticle(id: number) {
    const url = `${this.BASE_URL}/articles/${id}`;
    return this.http.get<any>(url);
  }

  editArticle(payload: any) {
    const url = `${this.BASE_URL}/articles/${payload.id}/edit`;
    return this.http.post<any>(url, payload.data);
  }

  getArticles(page: number) {
    let url = `${this.BASE_URL}/articles`;
    if (page != null) {
      url += `?page=${page}`;
    }
    return this.http.get<any>(url);
  }

  getSlideArticles() {
    const url = `${this.BASE_URL}/slide-articles`;
    return this.http.get<any>(url);
  }

  publish(id: number) {
    const url = `${this.BASE_URL}/articles/${id}/publish`;
    return this.http.post<any>(url, {id: id});
  }

  getArticleFromStore(id: any): Observable<Article> { // TODO improve code
    let currentArticle: Article = null;
    this.articleState.subscribe((state) => {
      if (state.currentArticle && state.currentArticle.id === id) {
        currentArticle = state.currentArticle;
      }
      state.articleList.map((article: Article) => {
        if (article.id === id) {
          currentArticle = article;
        }
      });
    });
    if (currentArticle == null) {
      return throwError('no item in store');
    }
    return of(currentArticle);
  }

  getArticlesFromStore(page: number): Observable<Article[]> {
    let list: Article[] = [];
    this.articleState.subscribe((state) => {
      list = state.articleList;
    });
    if (list.length === 0) {
      return throwError('no item in store');
    }

    return of(list);
  }

  getSlideArticlesFromStore() {
    let list: Article[] = [];
    this.articleState.subscribe((state) => {
      list = state.slideArticleList;
    });
    if (list.length === 0) {
      return throwError('no item in store');
    }

    return of(list);
  }
}
