import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService } from '../../shared/services/user.service';
import { OrderService } from '../../shared/services/order.service';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  date: string;
  items: OrderItem[];
}


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
  user: any = null;
  orders: any[] = [];  

  constructor(private userService: UserService, private orderService: OrderService) {}

  editingOrderIndex: number | null = null;

startEditing(index: number) {
  this.editingOrderIndex = index;
}

cancelEditing() {
  this.editingOrderIndex = null;
}

increaseItemQuantity(item: OrderItem) {
  item.quantity++;
}

decreaseItemQuantity(item: OrderItem) {
  if (item.quantity > 1) {
    item.quantity--;
  }
}

async saveEditedOrder(order: Order) {
  try {
    await this.orderService.updateOrder(order, order.items);
    order.date = new Date().toISOString(); // dátum frissítése
    this.editingOrderIndex = null;
    alert('Rendelés módosítva!');
  } catch (err) {
    console.error('Hiba a mentésnél:', err);
  }
}



  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(data => {
      if (data.user) {
        this.userName = `${data.user.name.lastname} ${data.user.name.firstname}`;  // igazítsd a mezőneveket a User interfészedhez
        this.userEmail = data.user.email;
        this.orders = data.orders;
      }
    });
  }

  reload(selectedIndex: number): void {
    this.selectedIndex = selectedIndex;
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

async onUpdateOrder(order: Order) {
  const updatedItems: OrderItem[] = order.items.map((item: OrderItem) => ({
    ...item,
    quantity: item.quantity + 1
  }));

  try {
    await this.orderService.updateOrder(order, updatedItems);
    alert('Rendelés frissítve!');
    order.items = updatedItems;
    order.date = new Date().toISOString();
  } catch (err) {
    console.error(err);
  }
}

async onDeleteOrder(order: Order) {
  try {
    await this.orderService.deleteOrder(order);
    alert('Rendelés törölve!');
    this.orders = this.orders.filter(o => o !== order);
  } catch (err) {
    console.error(err);
  }
}

}