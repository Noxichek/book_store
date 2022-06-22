export interface ICreateBookData {
  description: string;
  title: string;
  price: number;
  genres?: number[];
  writing_date: Date;
  release_date: Date;
}
