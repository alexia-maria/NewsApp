import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {NewsComponent} from './news/news.component';
import {CategoriesComponent} from './categories/categories.component';
import {UsersComponent} from './users/users.component';
import {AllNewsComponent} from './all-news/all-news.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'news', component: AllNewsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'users', component:  UsersComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
