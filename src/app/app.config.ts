import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; 

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({ projectId: "angular-c18d3", appId: "1:191586559298:web:92d44f971af479f10794db", storageBucket: "angular-c18d3.firebasestorage.app",
           apiKey: "AIzaSyATbhlwSs3kaEYK0ChmuTpSO0P4iUOfgjA", authDomain: "angular-c18d3.firebaseapp.com", messagingSenderId: "191586559298" })),
            provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
    ]
};
