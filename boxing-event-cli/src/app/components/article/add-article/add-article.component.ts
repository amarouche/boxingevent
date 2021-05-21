import {Component, OnInit} from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Article} from '../../../models/article';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '../../../services/article-service/article.service';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../../store/app.states';
import {Observable} from 'rxjs';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification-service/notification.service';
import {AddArticle} from '../../../store/actions/article.actions';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  public Editor = ClassicEditor;
  public config = {
    language: 'fr',
    toolbar: ['Heading', 'Bold', 'Italic', 'Link', 'BulletedList', 'NumberedList', 'BlockQuote', 'Undo', 'Redo'],
  };
  public article: Article = new Article();
  articleForm: FormGroup;
  submitted = false;
  state: Observable<any>;
  user: User;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder, private service: ArticleService,
              private router: Router, private notifyService: NotificationService) {
    this.state = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.state.subscribe((st) => {
      this.user = st.user;
    });
    this.initForm();
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
    formData.append('image', payload.image, payload.image.name);
    formData.append('title', payload.title);
    formData.append('content', payload.content);
    formData.append('summary', payload.summary);

    this.store.dispatch(new AddArticle(formData));
  }

  get f() {
    return this.articleForm.controls;
  }

  initForm() {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      summary: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

}
