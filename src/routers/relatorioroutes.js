import { Router } from 'express';
import { gerarRelatorio } from '../controllers/relatorio.controller.js';

const router = Router();

router.get('/estatisticas', gerarRelatorio);

export default router;