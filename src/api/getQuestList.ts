import axios from "axios";
import {QuestList} from "../models/Quest";
import {FearLevel, QuestType} from "../enums";

export type Request = {
  fearLevel?: FearLevel;
  type?: QuestType;
  minPrice?: number;
  sort?: Sort;
}

export type Sort = {
  minPrice?: Direction;
  discountInPercents?: Direction;
}

export enum Direction {
  ASC = 'acs',
  DESC = 'desc',
}

export async function getQuestList(request: Request): Promise<QuestList> {
  const params = new URLSearchParams();

  if (request.fearLevel != null) {
    params.append('fearLevel.equals', request.fearLevel.toString());
  }

  if (request.type != null) {
    params.append('type.equals', request.type.toString());
  }

  if (request.minPrice != null) {
    params.append('minPrice.lessThanOrEqual', request.minPrice.toString());
  }

  if (request?.sort?.discountInPercents != null) {
    params.append('sort', `discountInPercents,${request.sort.discountInPercents}`);
  }

  if (request?.sort?.minPrice != null) {
    params.append('sort', `minPrice,${request.sort.minPrice}`);
  }

  return (await axios.get(
    '/api/quests',
    {params}
  )).data;
}
