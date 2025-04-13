import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { routes } from './app/app.routes'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
