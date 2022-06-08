export interface IBook {
  author_id: number;
  description: string;
  id: number;
  price: number;
  release_date: Date;
  title: string;
  writing_date: Date;
  imageUrl?: string;
  genres?: any;
}
