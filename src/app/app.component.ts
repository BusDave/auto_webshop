import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './shared/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MenuComponent,
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLoggedIn = false;
  isHomePage = false;

  constructor(private changeDetectorRef: ChangeDetectorRef,  private authService: AuthService // 👈
    , private router: Router) {}

    private authSubscription?: Subscription;

    ngOnInit(): void {
      this.authSubscription = this.authService.currentUser.subscribe(user => {
        this.isLoggedIn = !!user;
    
        // 💡 Ellenőrizd, hogy van-e window és localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
        }
    
        this.changeDetectorRef.detectChanges();
      });
    
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.checkIfHomePage();
      });
    
      this.checkIfHomePage();
    }
    

  checkLoginStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    }
    this.changeDetectorRef.detectChanges();
  }

  checkIfHomePage(): void {
    this.isHomePage = this.router.url === '/' || this.router.url === '/home';
  }

  logout(): void {
    this.authService.signOut().then(() => {
      this.isLoggedIn = false;
      this.changeDetectorRef.detectChanges();
    }).catch((error) => {
      console.error('Hiba a kijelentkezéskor:', error);
    });
  }
  

  login(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLoggedIn', 'true');
    }
    this.isLoggedIn = true;
    this.changeDetectorRef.detectChanges(); 
    this.router.navigate(['/profile']); 
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
