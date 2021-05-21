import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectArticleState} from '../../../store/app.states';
import {Observable} from 'rxjs';
import {LoadSlideArticles} from '../../../store/actions/article.actions';
import {Article} from '../../../models/article';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-slide-article',
  templateUrl: './slide-article.component.html',
  styleUrls: ['./slide-article.component.css']
})
export class SlideArticleComponent implements OnInit {

  articleState: Observable<any>;
  articles: Article[];

  constructor(private store: Store<AppState>) {
    this.articleState = store.select(selectArticleState);
  }

  ngOnInit() {
    this.loadArticles();
    this.articleState.subscribe((state) => {
      this.articles = state.slideArticleList.content;
      this.displaySlide();
    });
  }

  loadArticles() {
    this.store.dispatch(new LoadSlideArticles());
  }

  displaySlide() {
    setTimeout(function () {
      if ($('.flexslider').length) {
        jQuery('.flexslider').flexslider({
          animation: 'slide',
          start: function (slider) {
            jQuery('body').removeClass('loading');
          }
        });
      }
    }, 500);
  }
}
