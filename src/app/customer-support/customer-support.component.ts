import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css']
})
export class CustomerSupportComponent {
  showLiveChat: boolean = false;

  openChat() {
    this.showLiveChat = true;
  }
  
  
}
