import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  selectedIndex = 0; 
  ProfileObject: any[] = [];
  userEmail: string = ''; 
  userName: string = '';  

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedProfiles = localStorage.getItem('ProfileObject');
      if (storedProfiles) {
        this.ProfileObject = JSON.parse(storedProfiles);
      }
    }
  
    const currentProfile = this.ProfileObject.find(profile => profile.email === localStorage.getItem('userEmail'));
    if (currentProfile) {
      this.userName = `${currentProfile.name.firstname} ${currentProfile.name.lastname}`;
      this.userEmail = currentProfile.email;
    }
  }

  reload(selectedIndex: number): void {
    this.selectedIndex = selectedIndex;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}