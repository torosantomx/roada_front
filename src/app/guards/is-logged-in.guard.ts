import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppRoutes } from '@routes/app.routes';
import { SessionService } from '@services/session.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const sessionService = inject(SessionService);
  const router = inject(Router);
  if (sessionService.isLoggedIn && sessionService.empresaSelected)
    return true;
  return router.createUrlTree([`/${AppRoutes.login}`]);
};
