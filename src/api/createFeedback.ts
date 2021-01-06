import axios from 'axios';

export type Request = {
  name: string;
  email: string;
  text: string;
};

export async function createFeedback(request: Request): Promise<void> {
  return await axios.post(
    '/player-api/feedback',
    request
  );
}
