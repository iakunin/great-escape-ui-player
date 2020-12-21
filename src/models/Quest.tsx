import {MetroList} from 'models/Metro';

export type Quest = {
  slug: string;
  title: string;
  description: string;
  discountInPercents: bigint;
  durationInMinutes: bigint;
  playersMinCount: bigint;
  playersMaxCount: bigint;
  minPrice: bigint;
  coverImage: string;
  companyTitle: string;
  metros: MetroList;
};

export type QuestList = Array<Quest>;
