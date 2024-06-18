import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private logoutStatus = new BehaviorSubject<boolean>(false);
  private jwtToken: string | null = null;
  private apiUrl = environment.backendUser;

  constructor(private http: HttpClient) {
    this.loggedIn.next(this.getJwtToken() !== null);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { login, password }).pipe(
      tap(response => {
        this.jwtToken = response.token;
        this.loggedIn.next(true);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  logout(): Observable<boolean> {
    this.jwtToken = null;
    this.loggedIn.next(false);
    this.logoutStatus.next(true);
    return this.logoutStatus.asObservable();
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(error => {
        console.error('Error in registration:', error);
        return throwError(() => new Error('Registration failed')); 
      })
    );
  }

  getJwtToken(): string | null {
    return this.jwtToken;
  }

  setJwtToken(token: string): void {
    this.jwtToken = token;
  }

}
