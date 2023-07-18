import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  retry,
  tap,
  throwError,
} from 'rxjs';
import {
  RegistrationInterface,
  RegistrationLoginResponse,
  UserInterface,
} from '@src/app/auth/types/authInterfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:3000/';
  private readonly REGISTER = 'register';
  private readonly LOGIN = 'login';
  private readonly ACCESS_TOKEN = 'accessToken';
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  public registerUser(user: RegistrationInterface): Observable<UserInterface> {
    return this.http
      .post<RegistrationLoginResponse>(this.BASE_URL + this.REGISTER, user)
      .pipe(
        retry(3),
        tap((response) => this.setAccessToken(response)),
        map((response) => response.user),
        catchError(this.handleError)
      );
  }

  public logIn(
    user: RegistrationInterface
  ): Observable<RegistrationLoginResponse> {
    return this.http.post<RegistrationLoginResponse>(
      this.BASE_URL + this.LOGIN,
      user
    );
  }

  public logOut(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  private setAccessToken({ accessToken }: RegistrationLoginResponse): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  private getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public getLogInStatus(): BehaviorSubject<boolean> {
    return this.isLoggedIn$;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
