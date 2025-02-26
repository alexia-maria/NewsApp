import {Component, Input} from '@angular/core';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input({required: true}) user!:UserModel;


}
