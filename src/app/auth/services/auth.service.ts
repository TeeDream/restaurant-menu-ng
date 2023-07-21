import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
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
export class AuthService implements OnDestroy {
  private readonly BASE_URL = 'http://localhost:3000/';
  private readonly REGISTER = 'register';
  private readonly LOGIN = 'login';
  private readonly ACCESS_TOKEN = 'accessToken';
  private readonly IS_ADMIN = 'isAdmin';
  private isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = false;
  isAdmin = false;
  isAdmin$ = new BehaviorSubject<boolean>(false);

  // redirectUrl: string | null = null;

  constructor(private http: HttpClient) {}

  public registerUser(user: RegistrationInterface): Observable<UserInterface> {
    return this.http
      .post<RegistrationLoginResponse>(this.BASE_URL + this.REGISTER, user)
      .pipe(
        retry(2),
        take(1),
        map((response) => response.user),
        catchError(this.handleError)
      );
  }

  public logIn(
    user: RegistrationInterface
  ): Observable<RegistrationLoginResponse> {
    return this.http
      .post<RegistrationLoginResponse>(this.BASE_URL + this.LOGIN, user)
      .pipe(
        retry(2),
        take(1),
        tap((response) => {
          this.setAccessToken(response);
          this.setRole(response);
        }),
        catchError(this.handleError)
      );
  }

  public logOut(): void {
    this.deleteAccessToken();
    this.removeRole();
    this.isAdmin = false;
    this.isAdmin$.next(this.isAdmin);
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
    this.isAdmin$.next(this.isAdmin);
  }

  private getRole(): boolean {
    const role: string | null = localStorage.getItem(this.IS_ADMIN);

    return !!(role && role.includes('true'));
  }

  public removeRole(): void {
    localStorage.setItem(this.IS_ADMIN, String(false));
  }

  public checkIsLoggedIn(): void {
    if (!this.getAccessToken()) return;

    this.isLoggedIn = true;
    this.isLoggedIn$.next(this.isLoggedIn);
    this.isAdmin = this.getRole();
    this.isAdmin$.next(this.isAdmin);
  }

  public getLogInStatus$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
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

  ngOnDestroy(): void {
    this.isLoggedIn$.complete();
    this.isAdmin$.complete();
  }
}
