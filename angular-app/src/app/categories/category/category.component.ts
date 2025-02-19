import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryModel} from '../category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  @Input({required: true}) category!: CategoryModel;

  @Output() view = new EventEmitter<number>();

  onViewNews() {
    console.log("viewing category with ID ", this.category.categoryId);
    this.view.emit(this.category.categoryId);
  }
}
