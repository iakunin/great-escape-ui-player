import axios from 'axios';
import {QuestList} from 'models/Quest';
import {FearLevel} from 'enums/FearLevel';
import {QuestType} from 'enums/QuestType';

export type Request = {
  fearLevel?: FearLevel;
  type?: QuestType;
  minPrice?: number;
  sort?: Sort;
};

export type Sort = {
  minPrice?: Direction;
  discount?: Direction;
};

export enum Direction {
  ASC = 'asc',
  DESC = 'desc',
}

export async function getQuestList(request: Request): Promise<QuestList> {
  const params = new URLSearchParams();

  if (request?.fearLevel != null) {
    params.append('fearLevel.equals', request.fearLevel.toString());
  }

  if (request?.type != null) {
    params.append('type.equals', request.type.toString());
  }

  if (request?.minPrice != null) {
    params.append('minPrice.lessThanOrEqual', request.minPrice.toString());
  }

  if (request?.sort?.discount != null) {
    params.append('sort', `discountInPercents,${request.sort.discount}`);
  }

  if (request?.sort?.minPrice != null) {
    params.append('sort', `minPrice,${request.sort.minPrice}`);
  }

  return (await axios.get(
    '/player-api/quests',
    {params}
  )).data;
}
