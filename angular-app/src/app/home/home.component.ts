import {Component, OnInit} from '@angular/core';
import {NewsModel} from '../news/news.model';
import {NewsService} from '../service/news.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NewsComponent} from '../news/news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NewsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public news: NewsModel[] = [];
  public recentNews: NewsModel[] = [];
  public recentDate: Date;
  public formattedDate: string = '';
  home: string = 'home';

  constructor(private newsService: NewsService) {
    this.recentDate = new Date(2021, 11, 17);
    this.formattedDate = this.recentDate.toISOString().split('T')[0];
  }

  ngOnInit() {
    //this.getNews();
    this.getRecentNews();
    console.log(this.recentDate);
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
