import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  queue: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    this.http.post<any>("/api/queue/send", {
      queue: this.queue, // Replace with the actual queue name
      text: this.message // Replace with the actual message content
    }).subscribe(
     data => {
       console.log('Response from /api/queue/send:', data); // Print the response to the console
       this.message = '';
     },
     error => {
       console.error('Error sending to queue:', error); // Log any error
      }
    );
  }
}
