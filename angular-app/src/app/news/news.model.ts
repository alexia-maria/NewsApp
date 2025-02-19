import {CategoryModel} from '../categories/category.model';
import {UserModel} from '../users/user.model';

export interface NewsModel{
  newsId?: number;
  newsTitle: string;
  newsContent: string;
  user: UserModel;
  category: CategoryModel;
  newsDate: string;
}
