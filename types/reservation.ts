import type { Room } from './room';

export type RoomSlug = Room['slug'];

export interface BookingPayload {
  code: string;
  locale: 'es' | 'en';
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  roomSlug: RoomSlug;
  extras: string[];
  grandTotalCOP: number;
  grandTotalUSD: number;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    requests: string;
  };
}

export interface GuestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  requests: string;
}

export interface BookingState {
  step: 1 | 2 | 3 | 4 | 5;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  roomSlug: RoomSlug | null;
  extras: string[];
  guestData: GuestData | null;
  confirmationCode: string | null;
}
