import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  BookingNotification,
  BookingNotificationType,
} from './booking-notification';

@Injectable({
  providedIn: 'root',
})
export class BookingNotificationService {
  public subject = new Subject<BookingNotification>();

  constructor() {}

  getNotification(): Observable<any> {
    return this.subject.asObservable();
  }

  showNotification(message: string, type: BookingNotificationType) {
    this.subject.next({ message, type });
  }

  showSuccessNotification(message: string) {
    this.showNotification(message, BookingNotificationType.Success);
  }

  showErrorNotification(message: string) {
    this.showNotification(message, BookingNotificationType.Error);
  }

  showInfoNotification(message: string) {
    this.showNotification(message, BookingNotificationType.Info);
  }
}
