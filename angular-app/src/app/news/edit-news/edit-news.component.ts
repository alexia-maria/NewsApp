import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NewsService} from '../../service/news.service';
import {UserService} from '../../service/user.service';
import {CategoriesService} from '../../service/categories.service';
import {NewsModel} from '../news.model';
import {CategoryModel} from '../../categories/category.model';
import {UserModel} from '../../users/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {forkJoin, map} from 'rxjs';


@Component({
  selector: 'app-edit-news',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-news.component.html',
  styleUrl: './edit-news.component.css'
})
export class EditNewsComponent implements OnInit, OnChanges {

  @Input() news: NewsModel = {
    newsTitle: '',
    newsContent: '',
    user: {firstName: '', lastName: '', username: '', password: '', email: ''},
    category: {categoryName: ''},
    newsDate: ''
  };
  @Input({required: true}) mode!: string;
  @Output() close = new EventEmitter<void>();


  @Output() newsUpdated = new EventEmitter<NewsModel>();
  @Output() newsSaved = new EventEmitter<NewsModel>();
  enteredNewsTitle = this.news.newsTitle;
  enteredNewsContent = '';
  enteredNewsDate = '';
  selectedUserId!: number;
  selectedCategoryId!: number;


  selectedUserName!: string;
  selectedCategoryName!: string;

  firstName: string = '';
  lastName: string = '';

  users: UserModel[] = [];
  categories: CategoryModel[] = [];

  constructor(private newsService: NewsService, private userService: UserService, private categoriesService: CategoriesService) {
  }

  onCancelCloseForm() {
    console.log("Closing form...");
    this.close.emit();
  }

  ngOnInit() {
    console.log("in init edit");
    // this.loadNewsDetails();
    this.loadUsers();
    this.loadCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['newsId'] && !changes['newsId'].firstChange) {
      console.log("News ID changed:", this.news.newsId);
      //this.loadNewsDetails(); // Se va reapela când newsId se schimbă
    }
  }

  // private loadNewsDetails() {
  //   this.newsService.findNewsById(this.newsId).subscribe(
  //     (news: NewsModel) => {
  //       this.enteredNewsTitle = news.newsTitle;
  //       this.enteredNewsContent = news.newsContent;
  //       this.enteredNewsDate = news.newsDate;
  //       this.selectedUserId = news.user.userId || 0;
  //       this.selectedCategoryId = news.category.categoryId;
  //       console.log("User ID:", this.selectedUserId);
  //       console.log("Category ID:", this.selectedCategoryId);
  //       this.selectedUserName = news.user.username;
  //       this.selectedCategoryName = news.category.categoryName;
  //
  //       console.log("Loaded News Details:", {
  //         selectedUserName: this.selectedUserName,
  //         selectedCategoryName: this.selectedCategoryName
  //       });
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error('Error fetching news details:', error);
  //     }
  //   );
  // }

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

  private loadCategories() {
    this.categoriesService.getCategories().subscribe(
      (categories: CategoryModel[]) => {
        this.categories = categories;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  // onEdit() {
  //   console.log("In edit");
  //
  //
  //   const updatedNews: Partial<NewsModel> = {
  //     newsTitle: this.enteredNewsTitle,
  //     newsContent: this.enteredNewsContent,
  //     newsDate: this.enteredNewsDate,
  //     user: { userId: this.selectedUserId } as UserModel,
  //     category: { categoryId: this.selectedCategoryId } as CategoryModel
  //   };
  //
  //   console.log(updatedNews);
  //
  //   this.newsService.updateNews(this.newsId, updatedNews).subscribe(
  //     (response: NewsModel) => {
  //       console.log('News updated successfully:', response);
  //       this.newsUpdated.emit(response);
  //       this.close.emit();
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error('Error updating news:', error);
  //     }
  //   );
  //
  //   this.close.emit();
  // }
  onEdit() {
    console.log("Selected Category:", this.selectedCategoryName);
    console.log("Selected User:", this.selectedUserName);

    forkJoin({
      user: this.userService.findUsersByName(this.selectedUserName).pipe(map(users => users[0] || null)),
      category: this.categoriesService.findCategoriesByName(this.selectedCategoryName).pipe(map(categories => categories[0] || null))
    }).subscribe(({user, category}) => {
      if (!user || !category) {
        console.error("User or category not found!");
        return;
      }

      const updatedNews: NewsModel = {
        newsTitle: this.news.newsTitle,
        newsContent: this.news.newsContent,
        newsDate: this.news.newsDate,
        user: user,
        category: category
      };

      console.log("Updated News:", updatedNews);

      this.newsService.updateNews(updatedNews).subscribe(
        (response: NewsModel) => {
          console.log('News updated successfully:', response);
          this.newsUpdated.emit(response);
          this.close.emit();
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating news:', error);
        }
      );
    }, error => {
      console.error('Error fetching user or category:', error);
    });
  }


  testClick() {
    console.log("test");
  }

  onSave() {
    console.log("Selected Category:", this.selectedCategoryName);
    console.log("Selected User:", this.selectedUserName);

    forkJoin({
      user: this.userService.findUsersByName(this.selectedUserName).pipe(map(users => users[0] || null)),
      category: this.categoriesService.findCategoriesByName(this.selectedCategoryName).pipe(map(categories => categories[0] || null))
    }).subscribe(({ user, category }) => {
      if (!user || !category) {
        console.error("User or category not found!");
        return;
      }

      const savedNews: NewsModel = {
        newsTitle: this.news.newsTitle,
        newsContent: this.news.newsContent,
        newsDate: this.news.newsDate,
        user: user,
        category: category
      };

      console.log("Saved News:", savedNews);

      this.newsService.addNews( savedNews).subscribe(
        (response: NewsModel) => {
          console.log('News saved successfully:', response);
          this.newsSaved.emit(response);
          this.close.emit();
        },
        (error: HttpErrorResponse) => {
          console.error('Error saving news:', error);
        }
      );
    }, error => {
      console.error('Error fetching user or category:', error);
    });
  }
}
