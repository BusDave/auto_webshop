import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fizetes.component.html',
  styleUrls: ['./fizetes.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart: CartItem[] = [];
  showModal: boolean = false;

  paymentData = {
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('cart')) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    }
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: CartItem) {
    this.cart = this.cart.filter(cartItem => cartItem !== item);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  openPaymentModal() {
    this.showModal = true;
  }

  confirmPayment() {
    if (this.paymentData.name && this.paymentData.cardNumber && this.paymentData.expiryDate && this.paymentData.cvv) {
      alert('Fizetés sikeres! Köszönjük a vásárlást!');
      localStorage.removeItem('cart');
      this.cart = [];
      this.showModal = false;
    } else {
      alert('Kérlek, töltsd ki az összes mezőt!');
    }
  }
}