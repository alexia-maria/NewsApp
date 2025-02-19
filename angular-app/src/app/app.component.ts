import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NewsModel} from './news/news.model';
import {NewsService} from './service/news.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NewsComponent} from './news/news.component';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewsComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public news: NewsModel[] = [];
  public recentNews: NewsModel[] = [];
  public recentDate: Date;
  public formattedDate: string = '';

  constructor(private newsService: NewsService) {
    this.recentDate = new Date(2021, 11, 17);
    this.formattedDate = this.recentDate.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.getNews();
    this.getRecentNews();
    console.log(this.recentDate);
  }

  private getNews() {
    this.newsService.getNews().subscribe(
      (response: NewsModel[]) => {
        this.news = response;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
      }
    );


  }

  private getRecentNews() {
    this.newsService.findNewsByDate(this.formattedDate).subscribe(
      (response: NewsModel[]) => {
        this.recentNews = response;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
      }
    )
  }
}
