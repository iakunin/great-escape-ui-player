import axios from "axios";
import {Quest} from "../models";
import {FearLevel, QuestType} from "../enums";

export type Request = {
  fearLevel?: FearLevel;
  type?: QuestType;
  minPrice?: number;
  sort?: {
    field: 'minPrice' | 'discountInPercents';
    direction: 'asc' | 'desc';
  }
}

export async function getQuestList(request: Request): Promise<Array<Quest>> {
  const params = new URLSearchParams();

  if (request.fearLevel !== undefined) {
    params.append('fearLevel.equals', request.fearLevel.toString());
  }

  if (request.type !== undefined) {
    params.append('type.equals', request.type.toString());
  }

  if (request.minPrice !== undefined) {
    params.append('minPrice.lessThanOrEqual', request.minPrice.toString());
  }

  if (request.sort !== undefined) {
    params.append('sort', `${request.sort.field},${request.sort.direction}`);
  }

  return (await axios.get(
    '/api/quests',
    {params}
  )).data;
}
