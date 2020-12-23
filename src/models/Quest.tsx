import {MetroList} from 'models/Metro';

export type Quest = {
  slug: string;
  title: string;
  description: string;
  discountInPercents: number;
  durationInMinutes: number;
  playersMinCount: number;
  playersMaxCount: number;
  minPrice: number;
  coverImage: string;
  companyTitle: string;
  metros: MetroList;
  locationAddress: string;
};

export type QuestList = Array<Quest>;
