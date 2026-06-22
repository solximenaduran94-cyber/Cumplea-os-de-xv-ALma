export interface GuestConfirmation {
  fullName: string;
  isAttending: boolean;
  dietaryRestrictions: string;
  totalGuests: number;
  wishes: string;
}

export interface Song {
  title: string;
  artist: string;
  url: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
