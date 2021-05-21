import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../../services/article-service/article.service';
import {Article} from '../../../models/article';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {NotificationService} from '../../../services/notification-service/notification.service';
import {Store} from '@ngrx/store';
import {AppState, selectArticleState} from '../../../store/app.states';
import {LoadArticle, PublishArticle} from '../../../store/actions/article.actions';

@Component({
  selector: 'app-preview-article',
  templateUrl: './preview-article.component.html',
  styleUrls: ['./preview-article.component.css']
})
export class PreviewArticleComponent implements OnInit {

  private articleState: Observable<any>;
  article: Article;

  constructor(private route: ActivatedRoute, private service: ArticleService, private router: Router,
              private notifService: NotificationService, private store: Store<AppState>) {
    this.articleState = store.select(selectArticleState);
  }

  ngOnInit() {
    this.articleState.subscribe((state) => {
      this.article = state.currentArticle;
    });
    this.getArticle();
  }

  getArticle(): void {
    this.store.dispatch(new LoadArticle(+this.route.snapshot.paramMap.get('id')));
  }

  onSubmit(id: number) {
    this.store.dispatch(new PublishArticle(id));
  }

}
