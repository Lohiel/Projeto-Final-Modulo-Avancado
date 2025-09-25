import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prismaClient.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// POST /medicos (Apenas Atendentes)
router.post('/', protect, authorize('ATENDENTE'), async (req, res) => {
  const { nome, email, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const medico = await prisma.medico.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
      select: { id: true, nome: true, email: true, role: true } // Não retornar a senha
    });
    res.status(201).json(medico);
  } catch (error) {
    res.status(400).json({ error: 'Email já cadastrado.' });
  }
});

// GET /medicos (Médicos e Atendentes)
router.get('/', protect, authorize('MEDICO', 'ATENDENTE'), async (req, res) => {
  const medicos = await prisma.medico.findMany({
    select: { id: true, nome: true, email: true }
  });
  res.json(medicos);
});

export default router;