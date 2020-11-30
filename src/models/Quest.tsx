import {Company} from "./Company";

export type Quest = {
  slug: string;
  title: string;
  description: string;
  discount: string; //@TODO: how this can be obtained?
  durationInMinutes: bigint;
  playersMinCount: bigint;
  playersMaxCount: bigint;
  metro: string; //@TODO: how this can be obtained?
  minPrice: string; //@TODO: how this can be obtained?
  company: Company
};

