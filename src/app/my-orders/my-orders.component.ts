import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  constructor(private product:ProductService){}
  orderData:order[]|undefined

  ngOnInit(): void {
     this.callCartList();
  }
  callCartList(){
    this.product.orderList().subscribe((result)=>{   
        this.orderData=result      
  })
  }
  cancleOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.callCartList();
    })
  }
  getProgressValue(status: string): number {
    switch (status) {
      case 'Order Placed':
        return 25;
      case 'Shipped':
        return 50;
      case 'On the way':
        return 75;
      case 'Delivered':
        return 100;
      default:
        return 0;
    }
  }
  
  getProgressType(status: string): string {
    switch (status) {
      case 'Order Placed':
        return 'info';
      case 'Shipped':
        return 'primary';
      case 'On the way':
        return 'warning';
      case 'Delivered':
        return 'success';
      default:
        return 'secondary';
    }
  }
  
}
