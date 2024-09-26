import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-read-message',
  templateUrl: './read-message.component.html',
  styleUrl: './read-message.component.css'
})
export class ReadMessageComponent {
  queue: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  readMessage() {
  this.http.get<any>(`/api/queue/read/${this.queue}`).subscribe(
     data => {
        this.message = data['text']; // Print the response to the console
    },
    error => {
        console.error('Error fetching status:', error); // Log any error
    });
  }
}
