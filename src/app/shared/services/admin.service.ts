// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, orderBy, limit, startAfter, collectionData, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private firestore: Firestore) {}

  getFeedbackByEmail(email: string): Observable<any[]> {
    const q = query(
      collection(this.firestore, 'Feedback'),
      where('email', '==', email),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' });
  }

  getFeedbackByDateRangeAndEmail(startDate: string, endDate: string): Observable<any[]> {
    const q = query(
      collection(this.firestore, 'Feedback'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate),
      orderBy('createdAt', 'asc'),
      orderBy('email', 'asc')
    );
    return collectionData(q, { idField: 'id' });
  }

  getUsersByOrderProductName(productName: string): Observable<any[]> {
    const q = query(
      collection(this.firestore, 'Users'),
      where('orders', 'array-contains', { name: productName })
    );
    return collectionData(q, { idField: 'id' });
  }

  // 4. (Opcióként, ha lenne külön Orders gyűjtemény) Orders lekérdezés user email alapján, dátum szerint csökkenően
  getOrdersFromUserByEmail(email: string): Observable<any[]> {
    const q = query(
      collection(this.firestore, 'Users'),
      where('email', '==', email)
    );
    return collectionData(q, { idField: 'id' });
  }
  
}
