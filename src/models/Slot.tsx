export type Slot = {
  id: string;
  isAvailable: boolean;
  price: number;
  discountInPercents: number;
  dateTimeLocal: string;
};

export type SlotList = Array<Slot>;
