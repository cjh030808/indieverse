export interface Story {
  id: string;
  memberName: string;
  memberImage: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  imageUrl?: string;
}

export interface BandMember {
  id: string;
  name: string;
  image: string;
  role: string;
} 