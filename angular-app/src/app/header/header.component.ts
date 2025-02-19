import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Router} from 'express';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  navigateToNews() {
    window.location.href = '/news';
  }

  onClick() {
    console.log("click");
  }
}
