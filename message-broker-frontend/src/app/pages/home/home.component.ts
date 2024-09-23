import { Component, inject } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
