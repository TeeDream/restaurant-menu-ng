import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@src/app/auth/services/auth.service';

export const canMatchGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isAdmin ? true : router.parseUrl('');
};
