import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent {
  userInput = '';
  chatMessages: { sender: string; text: string; timestamp: string }[] = [];
  @Output() close = new EventEmitter<void>();

  
  sendMessage() {
    if (this.userInput.trim()) {
      this.chatMessages.push({
        sender: 'user',
        text: this.userInput,
        timestamp: new Date().toLocaleTimeString()
      });

      const userText = this.userInput;
      this.userInput = '';

      setTimeout(() => {
        this.chatMessages.push({
          sender: 'agent',
          text: this.getAutoReply(userText),
          timestamp: new Date().toLocaleTimeString()
        });
      }, 1000);
    }
  }

  getAutoReply(message: string): string {
    if (message.toLowerCase().includes('order')) {
      return 'Can you please provide your order ID?';
    } else if (message.toLowerCase().includes('refund')) {
      return 'Refunds are usually processed within 5-7 business days.';
    } else {
      return 'Thank you for your message! A support agent will join shortly.';
    }
  }

  closeChat() {
    this.chatMessages = [];
    this.close.emit();
  }
}

