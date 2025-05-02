import { Component } from '@angular/core';
import { SellerService } from './services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Commerce-Angular';
  constructor(public router: Router) {}

  hideFooterOnRoutes: string[] = ['/live-chat']; 
}
