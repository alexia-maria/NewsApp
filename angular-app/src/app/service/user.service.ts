import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../users/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService{
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiServerUrl}/users/all`);
  }

  public addUser(user: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.apiServerUrl}/users/add`, user);
  }

  public updateUser(user: UserModel): Observable<UserModel>{
    return this.http.put<UserModel>(`${this.apiServerUrl}/users/update`, user);
  }

  public deleteUser(userId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userId}`);
  }

  public findUsersById(userId: number): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.apiServerUrl}/users/find/${userId}`);
  }

  public findUsersByName(username: string): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.apiServerUrl}/users/find/username/${username}`);
  }

}
