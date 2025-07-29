export interface Ticket {
  id: string;
  concertName: string;
  bandName: string;
  eventDate: string;
  venue: string;
  ticketImage: string;
  diary?: TicketDiary;
  createdAt: string;
}

export interface TicketDiary {
  id: string;
  ticketId: string;
  content: string;
  mediaUrls: string[];
  createdAt: string;
}

export interface PassportStats {
  totalConcerts: number;
  favoriteBand: string;
  firstConcertYear: string;
} 