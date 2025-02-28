import { AppDataSource } from "@config/data-source";
import { Book } from "@entities/book.entity";
import { Pagination } from "@utils/paginable";
import { PaginatedBooks } from "@interfaces/book.interface";

export class BookService {
  private bookRepository = AppDataSource.getRepository(Book);

  async createBook(data: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create(data);
    return await this.bookRepository.save(book);
  }

  async getAllBooks(
    page: number,
    perPage: number,
    sortBy: string,
    keyWord?: string,
    fromDate?: string,
    toDate?: string
  ): Promise<PaginatedBooks> {
    const sortOptions: Record<string, { column: keyof Book; order: "ASC" | "DESC" }> = {
      titleAsc: { column: "title", order: "ASC" },
      titleDesc: { column: "title", order: "DESC" },
      priceAsc: { column: "price", order: "ASC" },
      priceDesc: { column: "price", order: "DESC" },
      rateAsc: { column: "rating", order: "ASC" },
      rateDesc: { column: "rating", order: "DESC" },
      createdAtAsc: { column: "created_at", order: "ASC" },
      createdAtDesc: { column: "created_at", order: "DESC" },
    }

    const { column, order } = sortOptions[sortBy] || sortOptions["createdAtDesc"]

    const queryBuilder = this.bookRepository.createQueryBuilder("book");

    if (keyWord) {
      queryBuilder.andWhere(
        "book.title LIKE :keyword OR book.author LIKE :keyword",
        { keyword: `%${keyWord}%` }
      )
    }

    const fromDateParsed = fromDate ? new Date(fromDate) : null;
    const toDateParsed = toDate ? new Date(toDate) : null;

    if (fromDateParsed && toDateParsed && fromDateParsed.getTime() === toDateParsed.getTime()) {
      toDateParsed.setHours(23, 59, 59, 999);
    }

    if (fromDateParsed) {
      queryBuilder.andWhere("book.created_at >= :fromDate", { fromDate });
    }
    if (toDateParsed) {
      queryBuilder.andWhere("book.created_at <= :toDate", { toDate });
    }

    queryBuilder.orderBy(`book.${column}`, order);

    queryBuilder.skip((page - 1) * perPage).take(perPage);

    const [books, totalCount] = await queryBuilder.getManyAndCount();

    return {
      records: books,
      pagination: Pagination(page, perPage, totalCount)
    }
  }

  async getBookById(id: string): Promise<Book | null> {
    return await this.bookRepository.findOne({ where: { id } });
  }

  async updateBook(id: string, data: Partial<Book>): Promise<Book | null> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) return null;
    
    Object.assign(book, data);
    return await this.bookRepository.save(book);
  }

  async deleteBook(id: string): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    return result.affected === 1;
  }
}
