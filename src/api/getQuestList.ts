import axios from "axios";
import {Quest} from "../models";

export type Request = {
  // @TODO: add request fields
}

export async function getQuestList(request: Request): Promise<Array<Quest>> {
  return (await axios.get(
    //@TODO: extract `baseUrl` into config
    'http://localhost:8080/api/quests'
  )).data;
}
