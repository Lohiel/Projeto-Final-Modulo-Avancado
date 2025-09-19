import express from 'express';
import { PrismaClient } from '../prismaClient.js';
const router = express.Router();
const prisma = new PrismaClient();

// Rota para criar um novo paciente

routes.post('/', async (req, res) => {
    const { nome, motivo, prioridade } = req.body;
    const paciente = await prisma.paciente.create({
        data: {
            nome,
            motivo,
            prioridade
        }
    });
    res.status(201).json(paciente);
});

// Listar pacientes por prioridade

routes.get('/', async (req, res) => {
    const pacientes = await prisma.paciente.findMany({
        where: { status: 'Aguardando' },
        orderBy: [{ prioridade: 'asc' }]
    });
    });
    res.json(pacientes);
});

// Alterar status do paciente

routes.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const paciente = await prisma.paciente.update({
        where: { id: Number(id) },
        data: { status }
    });
    res.json(paciente);
});

export default router;
