import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { WishlistService } from '../services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  popularProduct: product[] | undefined
  allProduct: product[] | undefined

  removeCart:boolean=false
  wishlist: any[] = [];
  constructor(private product: ProductService,private user:UserService,private wishlistService: WishlistService,private toastr:ToastrService) { }
  // addToWishlist(product: any) {
  //   this.wishlistService.addToWishlist(product);
  // }
  ngOnInit(): void {
  //  console.log(this.removeCart)
    this.product.popularProducts().subscribe((data) => {
      this.popularProduct = data
      // console.log(data)
      this.product.getAllProducts().subscribe((data) => {
        this.allProduct = data;
      })
    })
    this.loadWishlist();
  }
  addToWishlist(product: any): void {
    const exists = this.wishlist.find(item => item.id === product.id);
    if (!exists) {
      this.wishlistService.addToWishlist(product);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      this.toastr.success('Product added to wishlist!');
    } else {
      this.toastr.warning('Product is already in wishlist.');
    }
  }

  loadWishlist(): void {
    const stored = localStorage.getItem('wishlist');
    this.wishlist = stored ? JSON.parse(stored) : [];
  }

  
}
