import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { SearchComponent } from '../search/search.component';
import { UserAuthComponent } from '../user-auth/user-auth.component';
import { PopupboxService } from '../services/popupbox.service';
import { Subscription } from 'rxjs';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType = 'default'
  sellerName: string = ''
  searchResult: undefined | product[];
  searchName: any = ''
  userName: any = ''
  cartItemsNumber = 0
  constructor(private route: Router, private product: ProductService, private popup: PopupboxService,private wishlistService: WishlistService) {
   
 this.popup.userLogoutEvent().subscribe((result)=>{
      if(result==true){
        this.userlogout();
      }
    })
 this.popup.sellerLogoutEvenr().subscribe((result)=>{
  if(result==true){
    this.logout();
  }
 })
  
  }
  wishlistItems: any[] = [];



  ngOnInit(): void {
  this.wishlistService.getWishlist().subscribe(items => {
    this.wishlistItems = items;
  });
    let cartItem = localStorage.getItem('localCart')
    if (cartItem) {
      this.cartItemsNumber = JSON.parse(cartItem).length
    }
    this.product.cartData.subscribe((items) => {
      this.cartItemsNumber = items.length
    })

    this.route.events.subscribe((val: any) => {

      if (localStorage.getItem('seller') && val && val.url && val.url.includes('seller')) {
        let sellerStore = localStorage.getItem('seller');
        let sellerData = sellerStore ? JSON.parse(sellerStore) : null
        this.sellerName = sellerData.name;
        if (val.url == 'seller-home' || 'seller-auth' || 'seller-add-product') {
          this.menuType = 'seller'
        }
      }

      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name;
          console.log("usrll==", val.url)
          if (val.url == '/seller-home' || '/seller-auth' || '/seller-add-product') {
            this.menuType = 'seller'
          }
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id)
        }
        else {
          this.menuType = 'default'
        }
      }
    });
  }
  
  userlogoutpopup(){
    this.popup.openPopUp();

  }
  userlogout() {
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
     this.product.cartData.emit([]);

  }

  sellerlogoutpopup(){
    this.popup.sellerOpenPopUp();
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }      

 
  searchProduct(word: KeyboardEvent) {
    if (word) {
      const element = word.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        result.length = 10;
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  submintSearch(value: any) {
    if (value) {
      this.route.navigate([`search/${value}`])
      this.product.setProductname(value);
    }

  }
  redirectToDetails(name: any) {
    this.route.navigate([`/search/` + name])
    //Set name in search box
    this.searchName = name
  }
  msgUserNotLogin: string = '';

goToNotification() {
  if (localStorage.getItem('user')) {
    console.log("user");
    
    window.location.href = '/notifications'; 
  } else {
   
    this.msgUserNotLogin = 'You need to Login to get notifications...';
    alert(this.msgUserNotLogin)
  }
}
}
