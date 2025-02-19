import {NewsModel} from '../news/news.model';
import {UserModel} from '../users/user.model';

export interface CommentModel{
  commentId?: number;
  commentContent: string;
  commentDate: string;
  news: NewsModel;
  user: UserModel;

}
