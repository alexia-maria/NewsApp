import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from './comment.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewsModel} from '../news/news.model';
import {NewsService} from '../service/news.service';
import {UserService} from '../service/user.service';
import {CategoriesService} from '../service/categories.service';
import {CommentsService} from '../service/comments.service';
import {UserModel} from '../users/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, map} from 'rxjs';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{

  @Input({required: true}) news!: NewsModel;

  @Output() close = new EventEmitter<void>();

  @Output() comment = new EventEmitter<CommentModel>();

  enteredContent = '';
  selectedUserName = '';
  guestUsername = 'guest';
  users: UserModel[] = [];
  guestUser: UserModel = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    username: '',
  };

  constructor(private commentService:CommentsService,  private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getUsers().subscribe(
      (users: UserModel[]) => {
        this.users = users;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching users:', error);
      }
    );
  }



  // onComment() {
  //   console.log("Selected News:", this.news.newsId);
  //   console.log("Selected username: ", this.selectedUserName)
  //   forkJoin({
  //     user: this.userService.findUsersByName(this.selectedUserName).pipe(map(users => users[0] || null)),
  //   }).subscribe(({ user }) => {
  //     if (!user && this.guestUsername == '') {
  //       console.error("User not found!");
  //       return;
  //     }
  //
  //     if(!user){
  //       const randomNumber = Math.floor(Math.random() * 9999) + 1;
  //       this.guestUser.username = `guest${randomNumber}`;
  //     }
  //
  //     const newComment: CommentModel = {
  //       commentContent: this.enteredContent,
  //       commentDate: new Date().toISOString().split('T')[0],
  //       newsId: this.news,
  //       commentAuthor: user == null ? this.guestUser : user,
  //     };
  //
  //     console.log("New Comment:", newComment);
  //
  //     this.commentService.addComment(newComment).subscribe(
  //       (response: CommentModel) => {
  //         console.log('News updated successfully:', response);
  //         this.comment.emit(response);
  //         this.close.emit();
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error('Error updating news:', error);
  //       }
  //     );
  //   }, error => {
  //     console.error('Error fetching user or category:', error);
  //   });
  // }

  onComment() {
    console.log("Selected News:", this.news.newsId);
    console.log("Selected username: ", this.selectedUserName);

    if (this.selectedUserName.startsWith('guest')) {
      // Generăm username-ul doar dacă a fost selectat "guest"
      const randomNumber = Math.floor(Math.random() * 9999) + 1;
      this.guestUser.username = `guest${randomNumber}`;
    }

    forkJoin({
      user: this.userService.findUsersByName(this.selectedUserName).pipe(map(users => users[0] || null)),
    }).subscribe(({ user }) => {
      if (!user && !this.selectedUserName.startsWith('guest')) {
        console.error("User not found!");
        return;
      }

      const newComment: CommentModel = {
        commentContent: this.enteredContent,
        commentDate: new Date().toISOString().split('T')[0],
        news: this.news,
        user: user ?? this.guestUser,  // Folosește guestUser dacă user e null
      };

      console.log("New Comment:", newComment);

      this.commentService.addComment(newComment).subscribe(
        (response: CommentModel) => {
          console.log('News updated successfully:', response);
          this.comment.emit(response);
          this.close.emit();
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating news:', error);
        }
      );
    }, error => {
      console.error('Error fetching user:', error);
    });
  }



  onCancelCloseForm() {
    this.close.emit();
  }
}
