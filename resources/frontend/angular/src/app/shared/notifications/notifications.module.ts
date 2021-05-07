import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingNotificationComponent } from './booking/booking-notification.component';
import { BookingNotificationService } from './booking/booking-notification.service';

@NgModule({
  declarations: [BookingNotificationComponent],
  imports: [CommonModule],
  exports: [BookingNotificationComponent],
  providers: [BookingNotificationService],
})
export class NotificationsModule {}
