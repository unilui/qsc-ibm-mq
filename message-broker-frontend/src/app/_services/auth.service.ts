import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, OAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../_models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then(() => {});
    return from(promise)
  }

  socialLogin(): Observable<void> {
    const provider = new OAuthProvider('microsoft.com');
    const promise = signInWithPopup(
      this.firebaseAuth, 
      provider
    ).then(() => {});
    return from(promise)
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then((response: any) =>
      updateProfile(response.user, { displayName: username }),
    );
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }
}
