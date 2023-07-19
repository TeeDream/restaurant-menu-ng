import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  Observable,
  of,
  retry,
  take,
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
  private readonly IS_ADMIN = 'isAdmin';
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = false;
  isAdmin = false;
  redirectUrl: string | null = null;

  constructor(private http: HttpClient) {}

  // store the URL so we can redirect after logging in

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => (this.isLoggedIn = true))
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  public registerUser(user: RegistrationInterface): Observable<UserInterface> {
    return this.http
      .post<RegistrationLoginResponse>(this.BASE_URL + this.REGISTER, user)
      .pipe(
        retry(3),
        map((response) => response.user),
        catchError(this.handleError)
      );
  }

  public logIn(
    user: Omit<RegistrationInterface, 'name'>
  ): Observable<RegistrationLoginResponse> {
    return this.http
      .post<RegistrationLoginResponse>(this.BASE_URL + this.LOGIN, user)
      .pipe(
        tap((response) => {
          this.setAccessToken(response);
          this.setRole(response);
        }),
        retry(3),
        take(1)
      );
  }

  public logOut(): void {
    this.deleteAccessToken();
    this.removeRole();
    this.isAdmin = false;
    this.isLoggedIn = false;
    this.isLoggedIn$.next(this.isLoggedIn);
  }

  private setAccessToken({ accessToken }: RegistrationLoginResponse): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    this.isLoggedIn = !!accessToken;
    this.isLoggedIn$.next(this.isLoggedIn);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public deleteAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  private setRole({ user }: RegistrationLoginResponse): void {
    localStorage.setItem(
      this.IS_ADMIN,
      user.admin ? String(user.admin) : String(false)
    );

    this.isAdmin = user.admin ? user.admin : false;
  }

  private getRole(): boolean {
    const role: string | null = localStorage.getItem(this.IS_ADMIN);

    return !!(role && role.includes('true'));
  }

  public removeRole(): void {
    localStorage.setItem(this.IS_ADMIN, String(false));
  }

  public checkIsLoggedIn(): boolean {
    if (this.getAccessToken()) {
      this.isLoggedIn = true;
      this.isLoggedIn$.next(this.isLoggedIn);
      this.isAdmin = this.getRole();

      return true;
    }

    return false;
  }

  public getLogInStatus$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
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
