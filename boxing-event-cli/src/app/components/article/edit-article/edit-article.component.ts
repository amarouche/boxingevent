import {Component, OnInit} from '@angular/core';
import {Article} from '../../../models/article';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, selectArticleState} from '../../../store/app.states';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../services/notification-service/notification.service';
import {AddArticle, EditArticle, LoadArticle} from '../../../store/actions/article.actions';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  public Editor = ClassicEditor;
  public config = {
    language: 'fr',
    toolbar: ['Heading', 'Bold', 'Italic', 'Link', 'BulletedList', 'NumberedList', 'BlockQuote', 'Undo', 'Redo'],
  };
  article: Article = new Article();
  articleForm: FormGroup;
  submitted = false;
  articleState: Observable<any>;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.articleState = this.store.select(selectArticleState);
  }

  ngOnInit() {
    this.loadArticle();
    this.articleState.subscribe((state) => {
      this.article = state.currentArticle;
      this.initForm();
    });
  }

  onImageChange(event) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.articleForm.get('image').setValue(file);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.articleForm.invalid) {
      return;
    }
    const payload = this.articleForm.getRawValue();
    const formData = new FormData();
    if (payload.image) {
      formData.append('image', payload.image, payload.image.name);
    }
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('summary', payload.summary);
    formData.append('imageUri', payload.imageUri);

    this.store.dispatch(new EditArticle({'id': this.article.id, 'data': formData}));
  }

  get f() {
    return this.articleForm.controls;
  }

  initForm() {
    this.articleForm = this.formBuilder.group({
      title: [this.article.title, Validators.required],
      content: [this.article.content, Validators.required],
      summary: [this.article.summary, Validators.required],
      image: [null],
      imageUri: [this.article.image, Validators.required]
    });
  }

  private loadArticle() {
    this.store.dispatch(new LoadArticle(+this.route.snapshot.paramMap.get('id')));
  }
}
