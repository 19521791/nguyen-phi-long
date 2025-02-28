import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((err) => err.message);
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: messages });
      return;
    }

    next();
  };
};
