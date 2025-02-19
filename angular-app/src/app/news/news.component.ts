import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NewsModel} from './news.model';
import {CommentComponent} from '../comment/comment.component';
import {CommentModel} from '../comment/comment.model';
import {CommentsService} from '../service/comments.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CommentDetailsComponent} from '../comment/comment-details/comment-details.component';


@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommentComponent,
    CommentDetailsComponent
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{

  public comments: CommentModel[] = [];

  @Input({required: true}) news!: NewsModel;
  @Input({required: true}) page!: string;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  isCommenting = false;

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit() {
    this.loadComments();
  }

  onEditNews() {
    this.edit.emit(this.news.newsId);
  }

  onDeleteNews() {
    console.log("Deleting news with ID ", this.news.newsId);
    this.delete.emit(this.news.newsId);
  }

  onComment() {
    this.isCommenting = true;
  }



  onClose() {
    this.isCommenting = false;
  }

  private loadComments() {
    this.commentsService.findCommentsByNewsId(this.news.newsId || -1).subscribe(
      (response: CommentModel[]) => {
        this.comments = response;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
      }
    );
  }
}
