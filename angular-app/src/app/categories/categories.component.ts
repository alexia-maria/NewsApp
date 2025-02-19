import {Component, OnInit} from '@angular/core';
import {CategoryModel} from './category.model';
import {CategoriesService} from '../service/categories.service';
import {NewsModel} from '../news/news.model';
import {HttpErrorResponse} from '@angular/common/http';
import {CategoryComponent} from './category/category.component';
import {NewsService} from '../service/news.service';
import {NewsComponent} from '../news/news.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoryComponent,
    NewsComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  public categories: CategoryModel[] = [];
  public news: NewsModel[] = [];

  constructor(private categoriesService: CategoriesService, private newsService: NewsService) {
  }
  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe(
      (response: CategoryModel[]) => {
        this.categories = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  onViewCategory(categoryId: number) {
    console.log(categoryId);
    this.newsService.findNewsByCategoryId(categoryId).subscribe(
      (response: NewsModel[]) => {
        this.news = response;
        console.log(this.news);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
