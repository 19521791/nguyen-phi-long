import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
} from "@controllers/book.controller";
import { validate } from "middlewares/validate.middleware";
import { createBookSchema, updateBookSchema } from "@validations/book.validation";

const router = Router();

router.post("/books", validate(createBookSchema), createBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.put("/books/:id", validate(updateBookSchema), updateBook);
router.delete("/books/:id", deleteBook);

export default router;
