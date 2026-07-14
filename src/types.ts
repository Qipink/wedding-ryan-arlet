export interface RSVP {
  id: string;
  name: string;
  guests: number;
  attending: boolean;
  notes?: string;
  createdAt: string;
}

export interface Wish {
  id: string;
  name: string;
  message: string;
  likes: number;
  likedByCurrentUser?: boolean;
  createdAt: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}
