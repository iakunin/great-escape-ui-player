export type Slot = {
  id: string;
  dateTimeLocal: string;
  isAvailable: boolean;
  priceOriginal: number;
  priceWithDiscount: number;
};

export type SlotList = Array<Slot>;
