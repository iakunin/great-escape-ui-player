import {MetroList} from 'models/Metro';

export type QuestPhoto = {
  url: string;
};

export type Quest = {
  id: string;
  slug: string;
  title: string;
  description: string;
  details: string;
  discountInPercents: number;
  durationInMinutes: number;
  playersMinCount: number;
  playersMaxCount: number;
  minPrice: number;
  companyTitle: string;
  metros: MetroList;
  locationAddress: string;
  coverPhoto: string;
  photos: Array<QuestPhoto>;
};

export type QuestList = Array<Quest>;
