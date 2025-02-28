import { Book } from "@entities/book.entity";
import { Pagination } from "@utils/paginable";

export interface PaginatedBooks {
  records: Book[];
  pagination: Pagination;
}
