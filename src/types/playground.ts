export interface FanDesign {
  id: string;
  title: string;
  description: string;
  bandName: string;
  itemType: 'photocard' | 'badge' | 'sticker' | 'poster' | 't-shirt';
  imageUrl: string;
  author: string;
  likes: number;
  comments: number;
  createdAt: string;
  isTemplate: boolean;
}

export type SortOption = 'band' | 'itemType' | 'popularity' | 'recency';

export interface FilterOptions {
  band?: string;
  itemType?: string;
  sortBy: SortOption;
} 