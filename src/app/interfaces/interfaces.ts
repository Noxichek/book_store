export interface Book {
  author_id: number,
  description: string,
  id: number,
  price: number,
  release_date: Date,
  title: string,
  writing_date: Date,
  imageUrl?: string,
  genres?: any
}

export interface Author {
  id: number,
  first_name: string,
  last_name: string,
  books?: string[]
}
