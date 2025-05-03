import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }
  private wishlist: any[] = [];
  private wishlistSubject = new BehaviorSubject<any[]>([]);

  getWishlist() {
    return this.wishlistSubject.asObservable();
  }

  addToWishlist(product: any) {
    if (!this.wishlist.find(item => item.id === product.id)) {
      this.wishlist.push(product);
      this.wishlistSubject.next(this.wishlist);
    }
  }

  removeFromWishlist(productId: number) {
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    this.wishlistSubject.next(this.wishlist);
  }
}


