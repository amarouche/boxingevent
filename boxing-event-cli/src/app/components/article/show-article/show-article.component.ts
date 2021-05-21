import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Article} from '../../../models/article';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../../services/article-service/article.service';
import {LoadArticle} from '../../../store/actions/article.actions';
import {NotificationService} from '../../../services/notification-service/notification.service';
import {Store} from '@ngrx/store';
import {AppState, selectArticleState} from '../../../store/app.states';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {

  private articleState: Observable<any>;
  article: Article;

  constructor(private route: ActivatedRoute, private service: ArticleService, private router: Router,
              private notifService: NotificationService, private store: Store<AppState>) {
    this.articleState = store.select(selectArticleState);
  }

  ngOnInit() {
    this.getArticle();
    this.articleState.subscribe((state) => {
      this.article = state.currentArticle;
    });
  }

  getArticle(): void {
    this.store.dispatch(new LoadArticle(+this.route.snapshot.paramMap.get('id')));
  }

}
