import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  async saveOrder(cart: CartItem[]): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Nem vagy bejelentkezve!');
    }

    const userRef = doc(this.firestore, 'Users', user.uid);

    const order = {
      date: new Date().toISOString(),
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }))
    };

    await updateDoc(userRef, {
      orders: arrayUnion(order)
    });
  }
  async deleteOrder(order: any) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error('Nem vagy bejelentkezve!');

    const userRef = doc(this.firestore, 'Users', user.uid);
    await updateDoc(userRef, {
      orders: arrayRemove(order)
    });
  }
  async updateOrder(oldOrder: any, newItems: any[]) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error('Nem vagy bejelentkezve!');

    const userRef = doc(this.firestore, 'Users', user.uid);

    const updatedOrder = {
      date: new Date().toISOString(),
      items: newItems
    };

    // 1. eltávolítjuk a régit
    await updateDoc(userRef, {
      orders: arrayRemove(oldOrder)
    });

    // 2. hozzáadjuk az újat
    await updateDoc(userRef, {
      orders: arrayUnion(updatedOrder)
    });
  }
}
