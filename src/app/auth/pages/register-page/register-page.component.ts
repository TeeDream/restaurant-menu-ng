import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
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
    confirmPassword: new FormControl('', [
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
    if (!this.loginGroup.valid) return;

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
