import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModel} from '../categories/category.model';
import {NewsModel} from '../news/news.model';

@Injectable({
  providedIn: 'root'
})

export class NewsService{
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getNews(): Observable<NewsModel[]> {
    return this.http.get<NewsModel[]>(`${this.apiServerUrl}/news/all`);
  }

  public addNews(news: NewsModel): Observable<NewsModel>{
    return this.http.post<NewsModel>(`${this.apiServerUrl}/news/add`, news);
  }

  public updateNews(news: NewsModel): Observable<NewsModel>{
    return this.http.put<NewsModel>(`${this.apiServerUrl}/news/update`, news);
  }

  // public updateNews(newsId: number, updatedNews: Partial<NewsModel>): Observable<NewsModel> {
  //   return this.http.put<NewsModel>(`${this.apiServerUrl}/news/update/${newsId}`, updatedNews);
  // }


  public deleteNews(newsId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/news/delete/${newsId}`);
  }

  public findNewsById(newsId: number): Observable<NewsModel>{
    return this.http.get<NewsModel>(`${this.apiServerUrl}/news/find/${newsId}`);
  }

  public findNewsByName(newsTitle: string): Observable<NewsModel[]>{
    return this.http.get<NewsModel[]>(`${this.apiServerUrl}/news/find/title/${newsTitle}`);
  }

  public findNewsByDate(newsDate: string): Observable<NewsModel[]>{
    return this.http.get<NewsModel[]>(`${this.apiServerUrl}/news/find/date/${newsDate}`);
  }

  public findNewsByCategoryId(categoryId: number): Observable<NewsModel[]>{
    return this.http.get<NewsModel[]>(`${this.apiServerUrl}/news/find/category/${categoryId}`);
  }
}
