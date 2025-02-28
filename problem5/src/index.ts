import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import 'dotenv/config';
import { StatusCodes } from "http-status-codes";

import bookRoute from "@routes/book.route"

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/v1', bookRoute)

app.get("/api/v1/health", (_req, res) => {
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    message: "OK" 
  });
});

AppDataSource.initialize().then(() => {
  console.log("✅ Connected to PostgreSQL!");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => console.error("❌ Database connection error:", err));
