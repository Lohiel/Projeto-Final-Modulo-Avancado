import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

import atendimentosRouter from "./routes/atendimentos.js";
import pacientesRouter from "./routes/pacientes.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use("/atendimentos", atendimentosRouter);
app.use("/pacientes", pacientesRouter);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de Gestão de Consultas Médicas" });
});

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
