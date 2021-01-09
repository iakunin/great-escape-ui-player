export enum ErrorKey {
  WrongOtp = 'wrongotp',
}

export type ErroneousResponse = {
  errorKey: ErrorKey;
  entityName: string;
  message: string;
  status: number;
  title: number;
  type: number;
};
