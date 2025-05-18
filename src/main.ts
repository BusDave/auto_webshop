import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "angular-c18d3", appId: "1:191586559298:web:92d44f971af479f10794db", storageBucket: "angular-c18d3.firebasestorage.app",
       apiKey: "AIzaSyATbhlwSs3kaEYK0ChmuTpSO0P4iUOfgjA", authDomain: "angular-c18d3.firebaseapp.com", messagingSenderId: "191586559298" })),
        provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
}).catch((err) => console.error(err));
