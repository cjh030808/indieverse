import { useQuery } from '@tanstack/react-query';
import { Ticket, PassportStats } from '@/types/passport';

// Mock data - 실제로는 API에서 가져올 데이터
const mockTickets: Ticket[] = [
  {
    id: '1',
    concertName: 'The Lumineers Live in Seoul',
    bandName: 'The Lumineers',
    eventDate: '2023-08-15',
    venue: 'Olympic Hall',
    ticketImage: 'https://picsum.photos/176/176?random=20',
    createdAt: '2023-08-15T00:00:00Z'
  },
  {
    id: '2',
    concertName: 'The Lumineers Summer Concert',
    bandName: 'The Lumineers',
    eventDate: '2023-07-20',
    venue: 'Jamsil Arena',
    ticketImage: 'https://picsum.photos/176/176?random=21',
    createdAt: '2023-07-20T00:00:00Z'
  },
  {
    id: '3',
    concertName: 'The Lumineers Spring Tour',
    bandName: 'The Lumineers',
    eventDate: '2023-06-05',
    venue: 'Seoul Arts Center',
    ticketImage: 'https://picsum.photos/176/176?random=22',
    createdAt: '2023-06-05T00:00:00Z'
  },
  {
    id: '4',
    concertName: 'The Lumineers World Tour',
    bandName: 'The Lumineers',
    eventDate: '2023-05-10',
    venue: 'KBS Hall',
    ticketImage: 'https://picsum.photos/176/176?random=23',
    createdAt: '2023-05-10T00:00:00Z'
  },
  {
    id: '5',
    concertName: 'The Lumineers Special Show',
    bandName: 'The Lumineers',
    eventDate: '2023-04-02',
    venue: 'Seoul Olympic Stadium',
    ticketImage: 'https://picsum.photos/176/176?random=24',
    createdAt: '2023-04-02T00:00:00Z'
  },
  {
    id: '6',
    concertName: 'The Lumineers Winter Concert',
    bandName: 'The Lumineers',
    eventDate: '2023-03-18',
    venue: 'Coex Hall',
    ticketImage: 'https://picsum.photos/176/176?random=25',
    createdAt: '2023-03-18T00:00:00Z'
  },
  {
    id: '7',
    concertName: 'The Lumineers Valentine Show',
    bandName: 'The Lumineers',
    eventDate: '2023-02-22',
    venue: 'Seoul Arts Center',
    ticketImage: 'https://picsum.photos/176/176?random=26',
    createdAt: '2023-02-22T00:00:00Z'
  },
  {
    id: '8',
    concertName: 'The Lumineers New Year Concert',
    bandName: 'The Lumineers',
    eventDate: '2023-01-07',
    venue: 'Olympic Hall',
    ticketImage: 'https://picsum.photos/176/176?random=27',
    createdAt: '2023-01-07T00:00:00Z'
  },
  {
    id: '9',
    concertName: 'The Lumineers Christmas Special',
    bandName: 'The Lumineers',
    eventDate: '2022-12-12',
    venue: 'Jamsil Arena',
    ticketImage: 'https://picsum.photos/176/176?random=28',
    createdAt: '2022-12-12T00:00:00Z'
  },
  {
    id: '10',
    concertName: 'The Lumineers Fall Tour',
    bandName: 'The Lumineers',
    eventDate: '2022-11-01',
    venue: 'Seoul Arts Center',
    ticketImage: 'https://picsum.photos/176/176?random=29',
    createdAt: '2022-11-01T00:00:00Z'
  },
  {
    id: '11',
    concertName: 'The Lumineers Autumn Concert',
    bandName: 'The Lumineers',
    eventDate: '2022-10-15',
    venue: 'KBS Hall',
    ticketImage: 'https://picsum.photos/176/176?random=30',
    createdAt: '2022-10-15T00:00:00Z'
  },
  {
    id: '12',
    concertName: 'The Lumineers Summer Festival',
    bandName: 'The Lumineers',
    eventDate: '2022-09-20',
    venue: 'Olympic Stadium',
    ticketImage: 'https://picsum.photos/176/176?random=31',
    createdAt: '2022-09-20T00:00:00Z'
  }
];

const mockStats: PassportStats = {
  totalConcerts: 12,
  favoriteBand: 'The Lumineers',
  firstConcertYear: '2018'
};

export function useTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: async (): Promise<Ticket[]> => {
      // 실제 API 호출을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTickets;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
}

export function usePassportStats() {
  return useQuery({
    queryKey: ['passport-stats'],
    queryFn: async (): Promise<PassportStats> => {
      // 실제 API 호출을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockStats;
    },
    staleTime: 10 * 60 * 1000, // 10분
  });
} 