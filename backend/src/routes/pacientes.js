import express from 'express';
import prisma from '../prismaClient.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Rota para criar um novo paciente

router.post('/', protect, authorize('ATENDENTE'), async (req, res) => {
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

router.get('/', protect, authorize('MEDICO', 'ATENDENTE'), async (req, res) => {
    const pacientes = await prisma.paciente.findMany({
        where: { status: 'Aguardando Atendimento' },
        orderBy: [{ prioridade: 'asc' }]
    });
    res.json(pacientes);
});

// Alterar status do paciente

router.patch('/:id/status', protect, authorize('MEDICO', 'ATENDENTE'), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const paciente = await prisma.paciente.update({
        where: { id: Number(id) },
        data: { status }
    });
    res.json(paciente);
});

export default router;
