import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';
import {ProfileComponent} from './components/profile/profile.component';
import {HomeComponent} from './components/home/home.component';
import {ManageClubComponent} from './components/club/manage-club/manage-club.component';
import {ClubDetailComponent} from './components/club/club-detail/club-detail.component';
import {AddBoxerComponent} from './components/boxer/add-boxer/add-boxer.component';
import {BoxerDetailComponent} from './components/boxer/boxer-detail/boxer-detail.component';
import {AddArticleComponent} from './components/article/add-article/add-article.component';
import {PreviewArticleComponent} from './components/article/preview-article/preview-article.component';
import {ShowArticleComponent} from './components/article/show-article/show-article.component';
import {ArticleListComponent} from './components/article/article-list/article-list.component';
import {EditArticleComponent} from './components/article/edit-article/edit-article.component';
import {UserArticleListComponent} from './components/article/user-article-list/user-article-list.component';
import {UserListComponent} from './components/user/component/list/list.component';

const routes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: '', component: HomeComponent},
  {path: 'manage-club', component: ManageClubComponent, canActivate: [AuthGuardService]},
  {path: 'club', component: ClubDetailComponent, canActivate: [AuthGuardService]},
  {path: 'add-boxer', component: AddBoxerComponent, canActivate: [AuthGuardService]},
  {path: 'boxer/:id', component: BoxerDetailComponent, canActivate: [AuthGuardService]},
  {path: 'add-article', component: AddArticleComponent, canActivate: [AuthGuardService]},
  {path: 'edit-article/:id', component: EditArticleComponent, canActivate: [AuthGuardService]},
  {path: 'preview-article/:id', component: PreviewArticleComponent, canActivate: [AuthGuardService]},
  {path: 'article/:id', component: ShowArticleComponent, canActivate: [AuthGuardService]},
  {path: 'articles', component: ArticleListComponent, canActivate: [AuthGuardService]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuardService]},
  {path: 'mes-articles', component: UserArticleListComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
