import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';

const router = express.Router();

// POST /auth/register (Para Atendentes)
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Por favor, forneça todos os campos.' });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const atendente = await prisma.atendente.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });
    res.status(201).json({ id: atendente.id, nome: atendente.nome, email: atendente.email });
  } catch (error) {
    res.status(400).json({ error: 'Email já cadastrado.' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const medico = await prisma.medico.findUnique({ where: { email } });
  const atendente = await prisma.atendente.findUnique({ where: { email } });

  const user = medico || atendente;

  if (!user || !await bcrypt.compare(senha, user.senha)) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET, // Adicione essa variável no seu .env
    { expiresIn: '8h' }
  );

  res.json({ token });
});

export default router;