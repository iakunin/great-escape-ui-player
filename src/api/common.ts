export enum ErrorKey {
  WrongOtp = 'wrongOtp',
  SlotTimeAlreadyPassed = 'slotTimeAlreadyPassed',
  SlotAlreadyBooked = 'slotAlreadyBooked',
  SlotUnavailableForBooking = 'slotUnavailableForBooking',
  EmailExists = 'emailExists',
}

export type ErroneousResponse = {
  errorKey: ErrorKey;
  entityName: string;
  message: string;
  status: number;
  title: number;
  type: number;
};
