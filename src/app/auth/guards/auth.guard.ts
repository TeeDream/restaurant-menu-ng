import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@src/app/auth/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn && !!auth.getAccessToken() && auth.isAdmin) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
