import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  largeOrders: any[] = [];
  firstFive: any[] = [];
  feedbacks: any[] = [];
  highValueOrders: any[] = [];
  ordersAfterDate: any[] = [];
  recentLongFeedbacks: any[] = [];

  emailControl = new FormControl('');
  dateControl = new FormControl('');

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  loadFeedbackByEmail() {
    const email = this.emailControl.value;
    if (email) {
      this.adminService.getFeedbackByEmail(email).subscribe(data => {
        this.feedbacks = data;
      });
    }
  }

  loadFeedbackByDateRange() {
    const dateRange = this.dateControl.value;
    if (dateRange) {
      const [startDate, endDate] = dateRange.split(','); // várható formátum: "2023-01-01,2023-12-31"
      if (startDate && endDate) {
        this.adminService.getFeedbackByDateRangeAndEmail(startDate.trim(), endDate.trim())
          .subscribe(data => {
            this.recentLongFeedbacks = data;
          });
      }
    }
  }

  loadUsersByProductName(productName: string) {
    if (productName) {
      this.adminService.getUsersByOrderProductName(productName).subscribe(data => {
        this.users = data;
      });
    }
  }

  loadOrdersByUserEmail() {
    const email = this.emailControl.value;
    if (email) {
      this.adminService.getOrdersFromUserByEmail(email).subscribe(users => {
        if(users.length > 0) {
          const orders = users[0].orders || [];
          this.ordersAfterDate = orders.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        } else {
          this.ordersAfterDate = [];
        }
      });
    }
  }
  
}
