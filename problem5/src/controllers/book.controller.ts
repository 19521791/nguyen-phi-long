import { Request, Response } from "express";
import { BookService } from "@services/book.service";
import { StatusCodes } from "http-status-codes";
import { getPageParams } from "@utils/paginable";

const bookService = new BookService();

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(StatusCodes.CREATED).json(book);
  } catch (err) { throw err }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { page, perPage, sortBy, keyWord, fromDate, toDate } = getPageParams(req);
    const books = await bookService.getAllBooks(page, perPage, sortBy, keyWord, fromDate,
       toDate
    );
    res.status(StatusCodes.OK).json(books);
  } catch (err) { throw err }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: "Invalid book ID" });
      return
    }

    const book = await bookService.getBookById(bookId);
    if (!book) {
      res.status(StatusCodes.NOT_FOUND).json({ errors: "Book not found" });
      return
    }

    res.status(StatusCodes.OK).json(book);
  } catch (err) { throw err }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: "Invalid book ID" });
      return
    }

    const book = await bookService.updateBook(bookId, req.body);
    if (!book) {
      res.status(StatusCodes.NOT_FOUND).json({ errors: "Book not found" });
      return
    }

    res.status(StatusCodes.OK).json(book);
  } catch (err) { throw err }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      res.status(StatusCodes.BAD_REQUEST).json({ errors: "Invalid book ID" });
      return
    }

    const success = await bookService.deleteBook(bookId);
    if (!success) {
      res.status(StatusCodes.NOT_FOUND).json({ errors: "Book not found" });
      return
    }

    res.status(StatusCodes.OK).json({ message: 'OK' });
  } catch (err) { throw err }
};
