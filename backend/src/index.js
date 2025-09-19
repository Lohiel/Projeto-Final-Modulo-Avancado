import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API rodando 🚀" });
});

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
