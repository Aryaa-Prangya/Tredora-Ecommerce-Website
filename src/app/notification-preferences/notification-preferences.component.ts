import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-preferences',
  templateUrl: './notification-preferences.component.html',
  styleUrls: ['./notification-preferences.component.css']
})
export class NotificationPreferencesComponent {
  notificationItems = [
    { id: 'orders', title: 'My Orders', description: 'Latest updates on your orders', enabled: true },
    { id: 'reminders', title: 'Reminders', description: 'Price Drops, Back-in-stock Products, etc.', enabled: true },
    { id: 'recommendations', title: 'Recommendations by Flipkart', description: 'Curated content based on interest', enabled: true },
    { id: 'offers', title: 'New Offers', description: 'Top Deals and more', enabled: false },
    { id: 'community', title: 'My Flipkart Community', description: 'Profile updates, newsletters, etc.', enabled: true },
    { id: 'feedback', title: 'Feedback and Review', description: 'Rating and reviews for your purchase', enabled: true },
  ];
}
