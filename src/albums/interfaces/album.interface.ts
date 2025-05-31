export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  createdAt: number;
  updatedAt: number;
}
