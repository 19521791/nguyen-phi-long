import { Pagination } from "@utils/paginable";

export interface BookResponse {
  id: string,
  title: string,
  author: string,
  description: string,
  price: number,
  rating: number,
  stock: boolean,
  thumbnail: string,
  created_at: string
}

export interface PaginatedBooks {
  records: BookResponse[];
  pagination: Pagination;
}
