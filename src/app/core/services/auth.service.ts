import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

const FAKE_TOKEN_KEY = 'fakeToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  readonly isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(FAKE_TOKEN_KEY);
    }
    return false;
  }

  login(email: string, password: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const fakeToken = btoa(`${email}:${Date.now()}`);
      localStorage.setItem(FAKE_TOKEN_KEY, fakeToken);
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(FAKE_TOKEN_KEY);
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }
}
