import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  authService = inject(AuthService)
  title = 'message-broker-frontend';

  constructor (private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email,
          username: user.displayName
        })
      } else {
        this.router.navigate(['login']);
        this.authService.currentUserSig.set(null);
      }
    })
  }
}
