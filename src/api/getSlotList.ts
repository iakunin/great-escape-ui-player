import axios from 'axios';
import {SlotImpl, SlotList, SlotRaw} from 'models/Slot';

export async function getSlotList(questId: string, from: Date, to: Date): Promise<SlotList> {
  const params = new URLSearchParams();
  params.append('questId.equals', questId);
  params.append('sort', 'dateTimeLocal,asc');
  params.append('size', '10000');
  params.append('dateTimeLocal.greaterThanOrEqual', from.toISOString());
  params.append('dateTimeLocal.lessThanOrEqual', to.toISOString());

  return (await axios.get<Array<SlotRaw>>(
    '/player-api/slots',
    {params}
  ))
    .data
    .map(slot => Object.assign(new SlotImpl(), slot));
}
