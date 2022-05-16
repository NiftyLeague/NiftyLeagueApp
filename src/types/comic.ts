export interface Comic {
  id: number;
  title: string;
  multiplier: number;
  wearableName?: string;
  viewsCount: number;
  balance?: number;
  image: string;
  thumbnail: string;
}

export interface Item {
  id: number | null;
  title: string;
  wearableName?: string;
  balance?: number;
  image: string;
  thumbnail?: string;
}
