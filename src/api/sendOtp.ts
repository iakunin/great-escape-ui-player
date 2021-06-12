import axios from 'axios';

export type Request = {
  phone: string;
};

export async function sendOtp(
  request: Request,
  reCaptchaPromise?: Promise<string>
): Promise<void> {
  if (request.phone) {
    request.phone = request.phone.replace(/\D/g, '');
  }

  return await axios.post(
    '/player-api/otp',
    {
      ...request,
      reCaptchaToken: reCaptchaPromise !== undefined
        ? await reCaptchaPromise
        : undefined
    }
  );
}
