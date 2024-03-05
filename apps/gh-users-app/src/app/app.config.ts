import { ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { API_URL } from 'libs/core/http-client/src/lib/api-url.token';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        loadComponent: () => import('profile-search').then((m) => m.ProfileSearchComponent),
      },
    ]),
    provideStore(), provideEffects(), provideAnimations(),
    provideHttpClient(),
    !environment.production ? provideStoreDevtools() : [],
    { provide: API_URL, useValue: environment.api_url },
  ],
};
