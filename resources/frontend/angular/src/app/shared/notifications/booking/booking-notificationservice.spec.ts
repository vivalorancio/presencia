import { TestBed } from '@angular/core/testing';

import { BookingNotificationService } from './booking-notification.service';

describe('BookingNotificationService', () => {
  let service: BookingNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
