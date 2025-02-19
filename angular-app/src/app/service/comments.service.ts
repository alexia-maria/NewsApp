import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModel} from '../categories/category.model';
import {CommentModel} from '../comment/comment.model';

@Injectable({
  providedIn: 'root'
})

export class CommentsService{
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getComments(): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.apiServerUrl}/comments/all`);
  }

  public addComment(comment: CommentModel): Observable<CommentModel>{
    return this.http.post<CommentModel>(`${this.apiServerUrl}/comments/add`, comment);
  }

  public updateComment(comment: CommentModel): Observable<CommentModel>{
    return this.http.put<CommentModel>(`${this.apiServerUrl}/comments/update`, comment);
  }

  public deleteComment(commentId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/categories/delete/${commentId}`);
  }

  public findCommentsByNewsId(newsId: number): Observable<CommentModel[]>{
    return this.http.get<CommentModel[]>(`${this.apiServerUrl}/comments/find/${newsId}`);
  }

}
