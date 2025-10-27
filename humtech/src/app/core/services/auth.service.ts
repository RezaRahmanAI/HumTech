import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

const TOKEN_KEY = 'humtech_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authenticated = signal<boolean>(this.hasToken());

  get isAuthenticated$(): Observable<boolean> {
    return of(this.authenticated());
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  login(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.authenticated.set(true);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticated.set(false);
  }

  private hasToken(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem(TOKEN_KEY);
  }
}
