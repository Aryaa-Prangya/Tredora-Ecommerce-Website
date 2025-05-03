import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../services/wishlist.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],

})
export class ProductDetailsComponent implements OnInit {
  productData:undefined | product;
  productQuantity:number=1;
  removeCart=false;
  cartData:product|undefined;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService,private toastr:ToastrService,private wishlistService: WishlistService) { }
  addToWishlist(product: any) {
    this.wishlistService.addToWishlist(product);
  }
  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);

    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productData= result;
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
        
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
        
           if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
       }
        });
        this.product.getCartList(userId);
      }      
    })
    
  }
  //-------------------------------------------------
  minus() {
    if (this.productQuantity > 1) {
      this.productQuantity -= 1
    }
  }
  plush() {
    return this.productQuantity += 1
  }

  addProduct() {
    this.removeCart = true;

if (this.productData) {
  this.productData.quantity = this.productQuantity;

  if (!localStorage.getItem('user')) {
    // Handle guest cart
    let cart = localStorage.getItem('localCart');
    let items = cart ? JSON.parse(cart) : [];
    
    let existingIndex = items.findIndex((p: cart) => p.id === this.productData?.id);
    
    if (existingIndex !== -1) {
      items[existingIndex].quantity = (items[existingIndex].quantity || 0) + this.productQuantity;
    } else {
      items.push({ ...this.productData, quantity: this.productQuantity });
    }
    
    localStorage.setItem('localCart', JSON.stringify(items));
    this.product.cartData.next(items);
    this.toastr.success(`${this.productData.name} has been added to your cart`);
    
  
  } else {
    // Handle user cart
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    let cartData: cart = {
      ...this.productData,
      userId,
      productId: this.productData.id,
      quantity: this.productQuantity
    };

    delete cartData.id;

    // Optional: You could first check if product is already in user’s cart using `this.product.getCartList()` and update if needed

    this.product.userAddToCart(cartData).subscribe((result) => {
      if (result) {
        this.product.getCartList(userId); // Refresh cart list
        this.removeCart = true;
      }
    });
  }
}

  }

  removeTocart(id: any) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemsFromCart(id)
      //this.removeCart = false;
    }
    {
      console.warn("cartData", this.cartData);
      
      this.cartData && this.product.removeToCartApi(this.cartData.id)
      .subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId)
      })
    }
    this.removeCart=false
  }

  }
