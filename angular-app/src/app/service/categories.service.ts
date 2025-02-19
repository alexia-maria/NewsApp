import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../users/user.model';
import {CategoryModel} from '../categories/category.model';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService{
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.apiServerUrl}/categories/all`);
  }

  public addCategory(category: CategoryModel): Observable<CategoryModel>{
    return this.http.post<CategoryModel>(`${this.apiServerUrl}/categories/add`, category);
  }

  public updateCategory(category: CategoryModel): Observable<CategoryModel>{
    return this.http.put<CategoryModel>(`${this.apiServerUrl}/categories/update`, category);
  }

  public deleteCategory(categoryId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/categories/delete/${categoryId}`);
  }

  public findCategoriesById(categoryId: number): Observable<CategoryModel>{
    return this.http.get<CategoryModel>(`${this.apiServerUrl}/categories/find/${categoryId}`);
  }

  public findCategoriesByName(categoryName: string): Observable<CategoryModel[]>{
    return this.http.get<CategoryModel[]>(`${this.apiServerUrl}/categories/find/name/${categoryName}`);
  }
}
