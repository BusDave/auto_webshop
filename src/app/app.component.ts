import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './shared/menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

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
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLoggedIn = false;
  isHomePage = false;

  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkIfHomePage();
      this.checkLoginStatus(); 
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
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLoggedIn', 'false');
    }
    this.isLoggedIn = false;
    this.changeDetectorRef.detectChanges(); 
    window.location.href = '/login'; 
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
}
