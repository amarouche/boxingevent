import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Article} from '../../../models/article';
import {Store} from '@ngrx/store';
import {AppState, selectArticleState} from '../../../store/app.states';
import {LoadArticles, LoadArticlesFromDB} from '../../../store/actions/article.actions';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articleState: Observable<any>;
  articles: Article[];
  totalPages: Array<number>;
  currentPage: number;

  constructor(private store: Store<AppState>) {
    this.articleState = store.select(selectArticleState);
  }

  ngOnInit() {
    this.loadArticles();
    this.articleState.subscribe((state) => {
      this.articles = state.articleList;
      this.totalPages = Array(state.totalPages);
      this.currentPage = state.currentPage;
    });
  }

  loadArticles() {
    this.store.dispatch(new LoadArticles(this.currentPage));
  }

  onPaginate(page: number) {
    this.store.dispatch(new LoadArticlesFromDB(page));
  }
}
