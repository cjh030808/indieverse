export interface Story {
  id: string;
  memberName: string;
  memberImage: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  imageUrl?: string;
  type?: 'story' | 'announcement' | 'photo' | 'video';
}

export interface BandMember {
  id: string;
  name: string;
  image: string;
  role: string;
} 