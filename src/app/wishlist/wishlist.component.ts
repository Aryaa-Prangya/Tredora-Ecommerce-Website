import { Component } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlistItems: any[] = [];

   constructor(private wishlistService:WishlistService){}
  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe((items) => {
      this.wishlistItems = items;
    });
   
  }

  loadWishlist(): void {
    const stored = localStorage.getItem('wishlist');
    this.wishlistItems = stored ? JSON.parse(stored) : [];
  }

  remove(id: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
  }
}

