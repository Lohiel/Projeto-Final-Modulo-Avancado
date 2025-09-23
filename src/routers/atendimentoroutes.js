import { Router } from 'express';
import { buscarHistorico } from '../controllers/atendimento.controller.js'; // Vamos criar essa função logo abaixo

const router = Router();

// Define a rota para o histórico
router.get('/historico', buscarHistorico);

export default router;