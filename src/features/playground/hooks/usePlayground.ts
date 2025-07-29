import { useQuery } from '@tanstack/react-query';
import { FanDesign } from '@/types/playground';

// Mock data - 실제로는 API에서 가져올 데이터
const mockDesigns: FanDesign[] = [
  {
    id: '1',
    title: 'The Lumineers Photocard Set',
    description: 'Beautiful photocard collection featuring the band members',
    bandName: 'The Lumineers',
    itemType: 'photocard',
    imageUrl: 'https://picsum.photos/176/235?random=40',
    author: 'fan_artist_1',
    likes: 156,
    comments: 23,
    createdAt: '2024-01-15T00:00:00Z',
    isTemplate: false
  },
  {
    id: '2',
    title: 'Indie Vibes Badge Collection',
    description: 'Hand-drawn badges with indie music themes',
    bandName: 'The Lumineers',
    itemType: 'badge',
    imageUrl: 'https://picsum.photos/176/235?random=41',
    author: 'creative_fan',
    likes: 89,
    comments: 12,
    createdAt: '2024-01-14T00:00:00Z',
    isTemplate: true
  },
  {
    id: '3',
    title: 'Concert Memories Stickers',
    description: 'Stickers inspired by live concert experiences',
    bandName: 'The Lumineers',
    itemType: 'sticker',
    imageUrl: 'https://picsum.photos/176/235?random=42',
    author: 'sticker_master',
    likes: 234,
    comments: 45,
    createdAt: '2024-01-13T00:00:00Z',
    isTemplate: false
  },
  {
    id: '4',
    title: 'Band Logo Poster Design',
    description: 'Minimalist poster featuring the band logo',
    bandName: 'The Lumineers',
    itemType: 'poster',
    imageUrl: 'https://picsum.photos/176/235?random=43',
    author: 'design_fan',
    likes: 178,
    comments: 31,
    createdAt: '2024-01-12T00:00:00Z',
    isTemplate: false
  },
  {
    id: '5',
    title: 'Tour T-Shirt Concept',
    description: 'Fan-made tour t-shirt design concept',
    bandName: 'The Lumineers',
    itemType: 't-shirt',
    imageUrl: 'https://picsum.photos/176/235?random=44',
    author: 'tshirt_designer',
    likes: 312,
    comments: 67,
    createdAt: '2024-01-11T00:00:00Z',
    isTemplate: true
  },
  {
    id: '6',
    title: 'Acoustic Session Photocard',
    description: 'Photocard from acoustic session memories',
    bandName: 'The Lumineers',
    itemType: 'photocard',
    imageUrl: 'https://picsum.photos/176/235?random=45',
    author: 'acoustic_lover',
    likes: 145,
    comments: 28,
    createdAt: '2024-01-10T00:00:00Z',
    isTemplate: false
  },
  {
    id: '7',
    title: 'Lyrics Quote Badge',
    description: 'Badge featuring favorite lyrics',
    bandName: 'The Lumineers',
    itemType: 'badge',
    imageUrl: 'https://picsum.photos/176/235?random=46',
    author: 'lyrics_fan',
    likes: 98,
    comments: 15,
    createdAt: '2024-01-09T00:00:00Z',
    isTemplate: false
  },
  {
    id: '8',
    title: 'Concert Venue Sticker Pack',
    description: 'Stickers featuring different concert venues',
    bandName: 'The Lumineers',
    itemType: 'sticker',
    imageUrl: 'https://picsum.photos/176/235?random=47',
    author: 'venue_collector',
    likes: 267,
    comments: 52,
    createdAt: '2024-01-08T00:00:00Z',
    isTemplate: true
  },
  {
    id: '9',
    title: 'Album Art Poster',
    description: 'Poster inspired by album artwork',
    bandName: 'The Lumineers',
    itemType: 'poster',
    imageUrl: 'https://picsum.photos/176/235?random=48',
    author: 'album_artist',
    likes: 189,
    comments: 34,
    createdAt: '2024-01-07T00:00:00Z',
    isTemplate: false
  },
  {
    id: '10',
    title: 'Fan Club T-Shirt',
    description: 'Official fan club t-shirt design',
    bandName: 'The Lumineers',
    itemType: 't-shirt',
    imageUrl: 'https://picsum.photos/176/235?random=49',
    author: 'fan_club_designer',
    likes: 445,
    comments: 89,
    createdAt: '2024-01-06T00:00:00Z',
    isTemplate: false
  },
  {
    id: '11',
    title: 'Backstage Photocard',
    description: 'Photocard from backstage moments',
    bandName: 'The Lumineers',
    itemType: 'photocard',
    imageUrl: 'https://picsum.photos/176/235?random=50',
    author: 'backstage_fan',
    likes: 123,
    comments: 19,
    createdAt: '2024-01-05T00:00:00Z',
    isTemplate: false
  },
  {
    id: '12',
    title: 'Tour Badge Collection',
    description: 'Collection of tour-specific badges',
    bandName: 'The Lumineers',
    itemType: 'badge',
    imageUrl: 'https://picsum.photos/176/235?random=51',
    author: 'tour_collector',
    likes: 167,
    comments: 26,
    createdAt: '2024-01-04T00:00:00Z',
    isTemplate: true
  },
  {
    id: '13',
    title: 'Concert Setlist Sticker',
    description: 'Sticker featuring concert setlist',
    bandName: 'The Lumineers',
    itemType: 'sticker',
    imageUrl: 'https://picsum.photos/176/235?random=52',
    author: 'setlist_fan',
    likes: 89,
    comments: 14,
    createdAt: '2024-01-03T00:00:00Z',
    isTemplate: false
  },
  {
    id: '14',
    title: 'Band Portrait Poster',
    description: 'Poster featuring band portraits',
    bandName: 'The Lumineers',
    itemType: 'poster',
    imageUrl: 'https://picsum.photos/176/235?random=53',
    author: 'portrait_artist',
    likes: 234,
    comments: 41,
    createdAt: '2024-01-02T00:00:00Z',
    isTemplate: false
  }
];

export function useFanDesigns() {
  return useQuery({
    queryKey: ['fan-designs'],
    queryFn: async (): Promise<FanDesign[]> => {
      // 실제 API 호출을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDesigns;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
} 