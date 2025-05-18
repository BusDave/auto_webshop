import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private firestore: Firestore) {}

  async sendFeedback(name: string, email: string, message: string): Promise<void> {
    const feedbackCollection = collection(this.firestore, 'Feedback');
    await addDoc(feedbackCollection, {
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    });
  }
}
