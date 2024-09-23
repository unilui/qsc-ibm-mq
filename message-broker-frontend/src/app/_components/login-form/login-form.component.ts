import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  authService = inject(AuthService);
  router = inject(Router)

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  userLogin(): void {
    if (this.loginForm.valid) {
      const rawForm = this.loginForm.getRawValue();
      this.authService
        .login(rawForm.email, rawForm.password)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.log("Login failed!")
          }
        });
      this.loginForm.reset();
    }
  }

  socialLogin(): void {
    this.authService
      .socialLogin()
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log("Login failed!")
        }
      });
    this.loginForm.reset();
  }
}
