import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {importProvidersFrom} from '@angular/core';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {routes} from './app.routes';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    ),
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
};
