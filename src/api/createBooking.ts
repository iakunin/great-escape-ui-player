import axios from 'axios';

export type Request = {
  slotId: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
};

export async function createBooking(request: Request): Promise<void> {
  if (request.phone) {
    request.phone = request.phone.replaceAll(/\D/g, '');
  }

  return await axios.post(
    '/player-api/bookings',
    request
  );
}
