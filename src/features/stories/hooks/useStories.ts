import { useQuery } from '@tanstack/react-query';
import { Story, BandMember } from '@/types/story';

// Mock data - 실제로는 API에서 가져올 데이터
const mockMembers: BandMember[] = [
  {
    id: '1',
    name: 'Liam',
    image: 'https://picsum.photos/64/64?random=1',
    role: 'Vocal'
  },
  {
    id: '2',
    name: 'Ethan',
    image: 'https://picsum.photos/64/64?random=2',
    role: 'Guitar'
  },
  {
    id: '3',
    name: 'Olivia',
    image: 'https://picsum.photos/64/64?random=3',
    role: 'Bass'
  },
  {
    id: '4',
    name: 'Noah',
    image: 'https://picsum.photos/64/64?random=4',
    role: 'Drums'
  },
  {
    id: '5',
    name: 'Ava',
    image: 'https://picsum.photos/64/64?random=5',
    role: 'Keyboard'
  }
];

const mockStories: Story[] = [
  {
    id: '1',
    memberName: 'Liam',
    memberImage: 'https://picsum.photos/32/32?random=1',
    content: 'Just finished a great practice session! Feeling pumped for the upcoming show. What songs are you hoping to hear?',
    timestamp: '23m ago',
    likes: 123,
    comments: 45,
    imageUrl: 'https://picsum.photos/464/256?random=10'
  },
  {
    id: '2',
    memberName: 'Ethan',
    memberImage: 'https://picsum.photos/32/32?random=2',
    content: 'Backstage vibes before the gig. Can\'t wait to hit the stage!',
    timestamp: '1h ago',
    likes: 210,
    comments: 78,
    imageUrl: 'https://picsum.photos/464/256?random=11'
  },
  {
    id: '3',
    memberName: 'Olivia',
    memberImage: 'https://picsum.photos/32/32?random=3',
    content: 'Quick coffee break before our next rehearsal. What\'s your favorite coffee shop?',
    timestamp: '2h ago',
    likes: 150,
    comments: 60,
    imageUrl: 'https://picsum.photos/464/256?random=12'
  },
  {
    id: '4',
    memberName: 'Noah',
    memberImage: 'https://picsum.photos/32/32?random=4',
    content: 'Working on some new lyrics. Inspiration strikes at the weirdest times!',
    timestamp: '3h ago',
    likes: 180,
    comments: 55,
    imageUrl: 'https://picsum.photos/464/256?random=13'
  },
  {
    id: '5',
    memberName: 'Ava',
    memberImage: 'https://picsum.photos/32/32?random=5',
    content: 'Just wrapped up a photoshoot. Feeling good about these shots!',
    timestamp: '4h ago',
    likes: 200,
    comments: 70,
    imageUrl: 'https://picsum.photos/464/256?random=14'
  }
];

export function useStories() {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async (): Promise<Story[]> => {
      // 실제 API 호출을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockStories;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
}

export function useBandMembers() {
  return useQuery({
    queryKey: ['band-members'],
    queryFn: async (): Promise<BandMember[]> => {
      // 실제 API 호출을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockMembers;
    },
    staleTime: 10 * 60 * 1000, // 10분
  });
} 