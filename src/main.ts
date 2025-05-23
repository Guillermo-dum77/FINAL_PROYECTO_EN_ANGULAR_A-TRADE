import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { appConfig } from './app/app.config';
import { RootComponent } from './app/root.component'; // ✅

bootstrapApplication(RootComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(BrowserAnimationsModule, ToastrModule.forRoot())
  ]
}).catch(err => console.error(err));
