export type Quest = {
  slug: string;
  title: string;
  description: string;
  discountInPercents: bigint;
  durationInMinutes: bigint;
  playersMinCount: bigint;
  playersMaxCount: bigint;
  metro: string;
  minPrice: bigint;
  coverImage: string;
  companyTitle: string;
};

export type QuestList = Array<Quest>;
