import axios from 'axios';

export type Request = {
  name: string;
  email: string;
  text: string;
};

export async function createFeedback(
  request: Request,
  reCaptchaPromise?: Promise<string>
): Promise<void> {
  return await axios.post(
    '/player-api/feedback',
    {
      ...request,
      reCaptchaToken: reCaptchaPromise !== undefined
        ? await reCaptchaPromise
        : undefined
    }
  );
}
