import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from '@src/app/auth/pages/register-page/must-match';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  hide = true;
  hideConfirm = true;
  loginGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(9),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: MustMatch('password', 'confirmPassword'),
    } as AbstractControlOptions
  );

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getErrorMessage(field: 'email' | 'password' | 'confirmPassword'): string {
    const controls = this.loginGroup.controls;

    switch (field) {
      case 'email':
        return controls.email.hasError('required')
          ? 'Email is required'
          : controls.email.hasError('email')
          ? 'Please enter a valid email address'
          : '';

      case 'password':
        return controls.password.hasError('required')
          ? 'Password is required'
          : controls.password.hasError('pattern')
          ? 'Please use only a-z in any case and numbers.'
          : controls.password.hasError('maxlength')
          ? "Password can't be longer than 9 chars."
          : controls.password.hasError('minlength')
          ? 'Password must be at least 5 chars long.'
          : '';

      case 'confirmPassword':
        return this.loginGroup.hasError('mustMatch')
          ? 'Confirm password must be the same as password.'
          : controls.confirmPassword.hasError('required')
          ? 'Confirm password is required'
          : '';

      default:
        return '';
    }
  }

  public onSubmit(): void {
    if (this.loginGroup.invalid) return;

    this.auth
      .registerUser({
        email: this.loginGroup.value.email as string,
        password: this.loginGroup.value.password as string,
      })
      .subscribe((data) => {
        this.router.navigate(['/login']);
      });
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
  }
}
