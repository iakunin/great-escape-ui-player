import axios from 'axios';
import {Quest} from 'models/Quest';

export async function getQuest(slug: string): Promise<Quest> {
  return (await axios.get(
    `/player-api/quests/${slug}`
  )).data;
}
