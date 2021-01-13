import axios from 'axios';

export type Request = {
  phone: string;
};

export async function sendOtp(request: Request): Promise<void> {
  if (request.phone) {
    request.phone = request.phone.replace(/\D/g, '');
  }

  return await axios.post(
    '/player-api/otp',
    request
  );
}
