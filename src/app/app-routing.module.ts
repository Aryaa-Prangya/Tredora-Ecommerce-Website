import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { NotificationPreferencesComponent } from './notification-preferences/notification-preferences.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { LiveChatComponent } from './live-chat/live-chat.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path:'',component:HomeComponent},

  { path:'seller-auth',component:SellerAuthComponent},

  { 
    path:'seller-home',component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-add-product',component:SellerAddProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-update-product/:id',component:SellerUpdateProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'search/:word',component:SearchComponent
  }
  ,
  {
    path:'product-details/:productId',component:ProductDetailsComponent
  }
  ,
  {
    path:'user-auth',component:UserAuthComponent
  },
  {
    path:'cart-page',component:CartPageComponent
  }
  ,
  {
    path:'checkout',component:CheckoutComponent
    
  } ,
  { path: 'notifications', component: NotificationPreferencesComponent },
  { path: '', redirectTo: '/notifications', pathMatch: 'full' },
  {path:'customer-support',component:CustomerSupportComponent},
  {path:'live-chat',component:LiveChatComponent},
  {
    path:'my-order',component:MyOrdersComponent
  },
  { path: 'wishlist', component: WishlistComponent },
  {
    path:'alertbox',component:AlertBoxComponent
  }
 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
