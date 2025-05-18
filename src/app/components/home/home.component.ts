import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HOME_IMAGES } from '../../shared/kepek/kepek.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../shared/services/feedback.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: ``,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  images = HOME_IMAGES;
  feedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  async submitFeedback() {
    if (this.feedbackForm.valid) {
      const { name, email, message } = this.feedbackForm.value;
      await this.feedbackService.sendFeedback(name, email, message);
      alert('Üzenet elküldve!');
      this.feedbackForm.reset();
    } else {
      alert('Kérlek, tölts ki minden mezőt helyesen!');
    }
  }
}
