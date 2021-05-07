import { Component, Input, OnInit } from '@angular/core';
import { BookingNotification } from './booking-notification';
import { BookingNotificationService } from './booking-notification.service';

@Component({
  selector: 'app-booking-notification',
  templateUrl: './booking-notification.component.html',
  styleUrls: ['./booking-notification.component.css'],
})
export class BookingNotificationComponent implements OnInit {
  bookingnotifications: BookingNotification[] = [];

  constructor(public bookingnotificationService: BookingNotificationService) {}

  ngOnInit(): void {
    this.bookingnotificationService
      .getNotification()
      .subscribe((bookingnotification: BookingNotification) => {
        this.bookingnotifications = [];
        if (!bookingnotification) {
          this.bookingnotifications = [];
          return;
        }
        this.bookingnotifications.push(bookingnotification);
        setTimeout(() => {
          // this.bookingnotifications = this.bookingnotifications.filter((x) => x !== bookingnotification);
          this.bookingnotifications.splice(0, 1);
        }, 4000);
      });
  }

  // removebookingnotification(bookingnotification: BookingNotification) {
  //   this.bookingnotifications = this.bookingnotifications.filter((x) => x !== bookingnotification);
  // }
}
