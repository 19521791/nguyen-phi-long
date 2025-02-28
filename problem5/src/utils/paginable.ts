import { Request } from "express";

export interface Pagination {
  page: number;
  perPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
  totalCount: number;
}

export const getPageParams = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.perPage as string) || 10;
  const sortBy = req.query.sortBy as string;
  const keyWord = req.query.keyWord as string;
  const fromDate = req.query.fromDate as string;
  const toDate = req.query.toDate as string;
  return { page, perPage, sortBy, keyWord, fromDate, toDate };
};

export const Pagination = (page: number, perPage: number, totalCount: number): Pagination => {
  const totalPages = Math.ceil(totalCount / perPage);
  return {
    page,
    perPage,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    totalPages,
    totalCount,
  };
};
