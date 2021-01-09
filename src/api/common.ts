export enum ErrorKey {
  WrongOtp = 'wrongOtp',
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
