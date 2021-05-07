export interface BookingNotification {
  message: string;
  type: BookingNotificationType;
}

export enum BookingNotificationType {
  Success = 0,
  Error,
  Info,
}
