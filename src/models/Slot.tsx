export type Slot = {
  id: string;
  dateTimeLocal: string;
  isAvailable: boolean;
  priceWithoutDiscount: number;
  priceWithDiscount: number;
};

export type SlotList = Array<Slot>;
