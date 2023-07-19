import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loginGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  // getErrorMessage() {
  //   if (this.loginGroup.value.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //
  //   return this.loginGroup.value.email.hasError('email') ? 'Not a valid email' : '';
  // }

  public onSubmit(): void {
    // this.router.routerState.snapshot

    if (!this.loginGroup.valid) return;

    this.auth
      .logIn({
        email: this.loginGroup.value.email as string,
        password: this.loginGroup.value.password as string,
      })
      .subscribe((data) => console.log(data));
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
  }
}
