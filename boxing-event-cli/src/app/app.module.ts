import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {TokenInterceptor} from './services/token.interceptor';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AddClubComponent} from './components/club/add-club/add-club.component';
import {AppRoutingModule} from './AppRoutingModule';
import {MyAppModule} from './localStorageSyncReducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ClubEffects} from './store/effects/club.effects';
import {ManageClubComponent} from './components/club/manage-club/manage-club.component';
import {ClubDetailComponent} from './components/club/club-detail/club-detail.component';
import {AddBoxerComponent} from './components/boxer/add-boxer/add-boxer.component';
import {BoxerDetailComponent} from './components/boxer/boxer-detail/boxer-detail.component';
import {ClubService} from './services/club-service/club.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotificationService} from './services/notification-service/notification.service';
import { SlideArticleComponent } from './components/article/slide-article/slide-article.component';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { PreviewArticleComponent } from './components/article/preview-article/preview-article.component';
import { ShowArticleComponent } from './components/article/show-article/show-article.component';
import {ArticleEffects} from './store/effects/article.effects';
import {UserEffects} from './store/effects/user.effects';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { EditArticleComponent } from './components/article/edit-article/edit-article.component';
import { UserArticleListComponent } from './components/article/user-article-list/user-article-list.component';
import {UserListComponent} from './components/user/component/list/list.component';
import {MatButtonModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    AddClubComponent,
    ManageClubComponent,
    ClubDetailComponent,
    AddBoxerComponent,
    BoxerDetailComponent,
    SlideArticleComponent,
    AddArticleComponent,
    PreviewArticleComponent,
    ShowArticleComponent,
    ArticleListComponent,
    EditArticleComponent,
    UserArticleListComponent,
    UserListComponent,
  //  ToastContainerDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    MyAppModule,
    EffectsModule.forRoot([AuthEffects, ClubEffects, ArticleEffects, UserEffects]),
    AppRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    MatSortModule
  ],
  providers: [
    AuthService,
    ClubService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [
    // ToastContainerDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
