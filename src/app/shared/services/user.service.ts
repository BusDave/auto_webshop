import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../users/User';
import { PRODUCTS } from '../termekek/termekek';
type Product = typeof PRODUCTS[number];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    
  ) { }
  

  getUserProfile(): Observable<{
    user: User | null,
    orders: Product[],
    stats: {
      total: number,
      completionRate: number
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            orders: [],
            stats: { total: 0, completionRate: 0 }
          });
        }

        return from(this.fetchUserWithOrders(authUser.uid));
      })
    );
  }

  private async fetchUserWithOrders(userId: string): Promise<{
    user: User | null,
    orders: any[], // itt az orders egy lista rendelés objektumokkal
    stats: {
      total: number,
      completionRate: number
    }
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
  
      if (!userSnapshot.exists()) {
        return {
          user: null,
          orders: [],
          stats: { total: 0, completionRate: 0 }
        };
      }
  
      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };
  
      // orders itt egy lista rendelésekkel, vagy üres
      const orders = user.orders || [];
  
      // Példa statisztika: összes rendelés száma
      const total = orders.length;
      const completionRate = 100; // vagy számold valahogy
  
      return {
        user,
        orders,
        stats: {
          total,
          completionRate
        }
      };
    } catch (error) {
      console.error('Hiba a rendelési adatok betöltése során:', error);
      return {
        user: null,
        orders: [],
        stats: { total: 0, completionRate: 0 }
      };
    }
  }
  
  
}
