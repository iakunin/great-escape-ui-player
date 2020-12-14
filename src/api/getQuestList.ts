import axios from "axios";
import {Quest} from "../models";
import {FearLevel, QuestType} from "../enums";

export type Request = {
  fearLevel?: FearLevel;
  type?: QuestType;
  minPrice?: number;
}

export async function getQuestList(request: Request): Promise<Array<Quest>> {
  console.log("request:" + JSON.stringify(request));

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

  return (await axios.get(
    //@TODO: extract `baseUrl` into config
    'http://localhost:8080/api/quests',
    {params}
  )).data;
}
