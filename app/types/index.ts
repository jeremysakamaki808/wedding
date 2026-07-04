export interface Couple {
  names: [string, string];
  pronouns: [string, string];
  date: string;
  time: string;
  timezone: string;
}

export interface Event {
  couple: Couple;
  tagline: string;
  description: string;
}

export interface VenueImage {
  id: string;
  url: string;
  alt: string;
  prompt: string;
}

export interface Venue {
  name: string;
  address: string;
  mapEmbed: string;
  description: string;
  arrival: string;
  ceremony: string;
  reception: string;
  parking: string;
  images: VenueImage[];
}

export interface TimelineItem {
  time: string;
  event: string;
  description: string;
  icon: string;
}

export interface WeddingPartyMember {
  id: string;
  name: string;
  role: string;
  side: 'bride' | 'groom';
  image: string;
  bio: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RSVPQuestion {
  id: string;
  type: 'text' | 'email' | 'radio' | 'checkbox' | 'select' | 'textarea';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  max_length?: number;
  conditional_on?: string;
  show_if?: string;
}

export interface RSVP {
  deadline: string;
  endpoint: string;
  questions: RSVPQuestion[];
}

export interface WeddingData {
  event: Event;
  venue: Venue;
  timeline: TimelineItem[];
  wedding_party: WeddingPartyMember[];
  faqs: FAQ[];
  rsvp: RSVP;
}

export interface RSVPSubmission {
  id?: string;
  timestamp: number;
  name: string;
  email: string;
  attendance: 'yes' | 'no';
  party_size?: number;
  dietary_restrictions: string[];
  message: string;
  ip_address?: string;
}

export interface FormErrors {
  [key: string]: string;
}
