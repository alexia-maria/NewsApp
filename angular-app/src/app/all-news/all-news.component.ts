import {Component, OnInit} from '@angular/core';
import {NewsModel} from '../news/news.model';
import {NewsService} from '../service/news.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NewsComponent} from '../news/news.component';
import {filter} from 'rxjs';
import {EditNewsComponent} from '../news/edit-news/edit-news.component';

@Component({
  selector: 'app-all-news',
  standalone: true,
  imports: [
    NewsComponent,
    EditNewsComponent
  ],
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.css'
})
export class AllNewsComponent implements OnInit{
  public news: NewsModel[] = [];
  public expandedNewsId: number | null = null;
  public filterValue: string ='';
  isEditing: boolean = false;
  isAdding : boolean = false;
  editedNews: number = 0;
  deletedNews: {} = {};
  edit: string = 'edit';
  save: string = 'save';
  page: string = 'news';

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.getNews();
  }

  private getNews() {
    this.newsService.getNews().subscribe(
      (response: NewsModel[]) => {
        this.news = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );


  }

  onReadMore(newsId: number) {
    this.expandedNewsId = this.expandedNewsId === newsId ? null : newsId;
  }


  onSearch(filterInput: HTMLInputElement): void {
    this.filterValue = filterInput.value;
    if(this.filterValue !== ''){
      this.newsService.findNewsByName(this.filterValue).subscribe((data: NewsModel[]) => {
        this.news = data;
      });
      console.log(this.news);
    }else {
      this.newsService.getNews().subscribe((data: NewsModel[]) => {
        this.news = data;
      });
    }

    this.filterValue = '';
  }


  onEdit(selectedId: number) {
    console.log("Editing news with ID:", selectedId);
    this.isEditing = true;
    this.editedNews = selectedId;
    console.log(this.editedNews);
  }



  oncloseEditing() {
    console.log("Closing edit mode");
    this.isEditing = false;
    console.log("in close");
  }

  onDelete(deletedId: number) {
    console.log("Delete: ID: ", deletedId);
    console.log("Delete: ID: ", deletedId);

    this.newsService.deleteNews(deletedId).subscribe(
      () => {
        console.log("News deleted successfully!");
        this.news = this.news.filter(newsItem => newsItem.newsId !== deletedId);
      },
      (error: HttpErrorResponse) => {
        console.error("Error deleting news:", error);
      }
    );
  }

  onAddNews() {
    this.isAdding = true;
  }
}
