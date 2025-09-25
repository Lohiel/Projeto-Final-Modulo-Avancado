import express from "express";
import prisma from "../prismaClient.js";
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Iniciar atendimento
router.post('/iniciar', protect, authorize('MEDICO'), async (req, res) => {
  const { pacienteId } = req.body;
  const medicoId = req.user.id;

  // Atualiza status do paciente
  await prisma.paciente.update({
    where: { id: pacienteId },
    data: { status: "em_atendimento" }
  });

  const atendimento = await prisma.atendimento.create({
    data: { pacienteId, medicoId }
  });

  res.json(atendimento);
});

// Finalizar atendimento
router.post('/finalizar/:id', protect, authorize('MEDICO'), async (req, res) => {
  const { id } = req.params;

  const atendimento = await prisma.atendimento.update({
    where: { id: Number(id) },
    data: {
      status: "finalizado",
      updatedAt: new Date()
    }
  });

  // Atualiza status do paciente
  await prisma.paciente.update({
    where: { id: atendimento.pacienteId },
    data: { status: "atendido" }
  });

  res.json(atendimento);
});

export default router;
