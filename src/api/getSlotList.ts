import axios from 'axios';
import {SlotList} from 'models/Slot';

export async function getSlotList(questId: string): Promise<SlotList> {
  return (await axios.get(
    `/player-api/slots?questId.equals=${questId}&sort=dateTimeLocal,asc`
  )).data;
}
