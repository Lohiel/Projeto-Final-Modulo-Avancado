import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import atendimentosRouter from "./routes/atendimentos.js";
import pacientesRouter from "./routes/pacientes.js";
import medicosRouter from './routes/medicos.js';
import authRouter from './routes/auth.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/atendimentos", atendimentosRouter);
app.use("/pacientes", pacientesRouter);
app.use("/medicos", medicosRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "API de Gestão de Consultas Médicas" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
