import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from '@services/config/httpInterceptor';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {

  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withHashLocation()),
  provideAnimationsAsync(),
  provideNativeDateAdapter(),
  provideHttpClient(withFetch(),  withInterceptors([httpInterceptor]))
  ]
};
