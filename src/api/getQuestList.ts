import axios from "axios";
import {QuestList} from "../models/Quest";
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

  if (request.sort != null) {
    params.append('sort', `${request.sort.field},${request.sort.direction}`);
  }

  return (await axios.get(
    '/api/quests',
    {params}
  )).data;
}
