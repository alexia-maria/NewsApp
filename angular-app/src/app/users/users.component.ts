import {Component, OnInit} from '@angular/core';
import {UserModel} from './user.model';
import {UserService} from '../service/user.service';
import {CategoryModel} from '../categories/category.model';
import {HttpErrorResponse} from '@angular/common/http';
import {UserComponent} from './user/user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  public users: UserModel[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }


  private getUsers() {
    this.userService.getUsers().subscribe(
      (response: UserModel[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
