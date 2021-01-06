export type SlotRaw = {
  id: string;
  dateTimeLocal: string;
  isAvailable: boolean;
  priceOriginal: number;
  priceWithDiscount: number;
};

export interface Slot extends SlotRaw {
  readonly formattedDate: string;
  readonly formattedTime: string;
  readonly weekDayShort: string;
  readonly weekDayLong: string;
}

export class SlotImpl implements Slot {

  public id!: string;
  public dateTimeLocal!: string;
  public isAvailable!: boolean;
  public priceOriginal!: number;
  public priceWithDiscount!: number;

  private _formattedDate: string | undefined = undefined;
  private _formattedTime: string | undefined = undefined;
  private _weekDayShort: string | undefined = undefined;
  private _weekDayLong: string | undefined = undefined;
  private _dateWithoutTime: Date | undefined = undefined;

  public get formattedDate(): string {
    if (this._formattedDate === undefined) {
      this._formattedDate = this.dateWithoutTime().toLocaleString(
        'ru-RU',
        {month: 'long', day: 'numeric', timeZone: 'UTC'}
      );
    }

    return this._formattedDate;
  }

  public get formattedTime(): string {
    if (this._formattedTime === undefined) {
      this._formattedTime = new Date(this.dateTimeLocal).toLocaleString(
        'ru-RU',
        {hour: '2-digit', minute: '2-digit', timeZone: 'UTC'}
      );
    }

    return this._formattedTime;
  }

  public get weekDayShort(): string {
    if (this._weekDayShort === undefined) {
      this._weekDayShort = this.dateWithoutTime().toLocaleString(
        'ru-RU',
        {weekday: 'short', timeZone: 'UTC'}
      );
    }

    return this._weekDayShort;
  }

  public get weekDayLong(): string {
    if (this._weekDayLong === undefined) {
      this._weekDayLong = this.dateWithoutTime().toLocaleString(
        'ru-RU',
        {weekday: 'long', timeZone: 'UTC'}
      );
    }

    return this._weekDayLong;
  }

  private dateWithoutTime(): Date {
    if (this._dateWithoutTime === undefined) {
      this._dateWithoutTime = new Date(this.dateTimeLocal);
      this._dateWithoutTime.setUTCHours(0, 0, 0, 0);
    }

    return this._dateWithoutTime;
  }
}

export type SlotList = Array<Slot>;
