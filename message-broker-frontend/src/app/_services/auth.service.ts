import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getRedirectResult, OAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithRedirect, signOut, updateProfile, user } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../_models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

  constructor () {
    // Listen for changes in the user's authentication state
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        user.getIdToken().then((tokenId) => {
          localStorage.setItem('tokenId', this.sanitizeToken(tokenId));
        });
      } else {
        localStorage.removeItem('tokenId');
      }
    });
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then(async (userCredential) => {
      const tokenId = await userCredential.user.getIdToken();
      localStorage.setItem('tokenId', this.sanitizeToken(tokenId))
    });
    return from(promise)
  }

  socialLogin(): Observable<void> {
    const provider = new OAuthProvider('microsoft.com');
    // Start the sign-in process
    signInWithRedirect(this.firebaseAuth, provider);

    return from(getRedirectResult(this.firebaseAuth).then(async (userCredential: any) => {
        if (userCredential) {
            const tokenId = await userCredential.user.getIdToken(); // Get the token from userCredential
            localStorage.setItem('tokenId', this.sanitizeToken(tokenId));
        }
    }));
  }

  private sanitizeToken(token: string): string {
    return token.replace(/\n/g, '').replace(/\r/g, '');
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

  getToken(): string | null {
    return localStorage.getItem('tokenId');
  }
}
