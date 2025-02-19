import {Component, Input} from '@angular/core';
import {CommentModel} from '../comment.model';

@Component({
  selector: 'app-comment-details',
  standalone: true,
  imports: [],
  templateUrl: './comment-details.component.html',
  styleUrl: './comment-details.component.css'
})
export class CommentDetailsComponent {

  @Input({required: true}) comment!: CommentModel;
}
