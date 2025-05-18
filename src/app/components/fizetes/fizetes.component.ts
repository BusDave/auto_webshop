import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';




interface CartItem {
  id: string;
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
  constructor(private router: Router,  private orderService: OrderService
  ) {}

  cart: CartItem[] = [];
  showModal: boolean = false;


  paymentData = {
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (!user) {
        if (typeof window !== 'undefined') {
          alert('Be kell jelentkezned a fizetéshez!');
        }
        this.router.navigate(['/login']);
      } else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          this.cart = JSON.parse(savedCart);
        }
      }
    });
  }
  
  
  async saveOrderToFirebase() {
    try {
      await this.orderService.saveOrder(this.cart);
      console.log('Rendelés elmentve Firebase-be');
    } catch (error) {
      alert('Hiba a mentés során: ');
      console.error('Hiba a mentéskor:', error);
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
    if (
      this.paymentData.name &&
      this.paymentData.cardNumber &&
      this.paymentData.expiryDate &&
      this.paymentData.cvv
    ) {
      this.saveOrderToFirebase().then(() => {
        alert('Fizetés sikeres! Köszönjük a vásárlást!');
        localStorage.removeItem('cart');
        this.cart = [];
        this.showModal = false;
      });
    } else {
      alert('Kérlek, töltsd ki az összes mezőt!');
    }
  }
  
}