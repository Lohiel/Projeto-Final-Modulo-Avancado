import express from 'express';
import prisma from '../prismaClient.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Rota para criar um novo paciente

router.post('/', async (req, res) => {
    const { nome, motivo, prioridade } = req.body;
    const paciente = await prisma.paciente.create({
        data: {
            nome,
            motivo,
            prioridade: Number(prioridade)
        }
    });
    res.status(201).json(paciente);
});

// Listar pacientes por prioridade

router.get('/', async (req, res) => {
    const pacientes = await prisma.paciente.findMany({
        where: { status: 'Aguardando Atendimento' },
        orderBy: [{ prioridade: 'asc' }]
    });
    res.json(pacientes);
});

// Alterar status do paciente

router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const paciente = await prisma.paciente.update({
        where: { id: Number(id) },
        data: { status }
    });
    res.json(paciente);
});

router.patch('/resetar-fila', async (req, res) => {
    const pacientes = await prisma.paciente.updateMany({
        data: { status: 'Aguardando Atendimento' },
    });
    res.json({ message: 'Fila resetada', count: pacientes.count });
});

export default router;
