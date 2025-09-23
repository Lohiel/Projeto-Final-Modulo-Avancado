// Importe a instância do Prisma Client que sua equipe configurou
import prisma from '../prismaClient.js';

export const buscarHistorico = async (req, res) => {
  try {
    // 1. Pegar os filtros da URL (query params)
    const { nomePaciente, data, status } = req.query;

    // 2. Montar o objeto de consulta para o Prisma
    const whereClause = {
      status: 'ATENDIDO', // Por padrão, o histórico é de quem já foi atendido
    };

    if (nomePaciente) {
      // Filtra pelo nome do paciente (contido no nome)
      whereClause.paciente = { nome: { contains: nomePaciente, mode: 'insensitive' } };
    }
    if (status) {
      // Permite que o usuário busque por outros status se quiser
      whereClause.status = status;
    }
    if (data) {
      // Filtra por atendimentos que iniciaram na data especificada
      const dataInicio = new Date(data);
      const dataFim = new Date(data);
      dataFim.setDate(dataFim.getDate() + 1); // Pega o dia inteiro

      whereClause.horaInicio = {
        gte: dataInicio, // gte = greater than or equal (maior ou igual a)
        lt: dataFim,      // lt = less than (menor que)
      };
    }

    // 3. Fazer a busca no banco de dados
    const historico = await prisma.atendimento.findMany({
      where: whereClause,
      include: {
        // Para trazer os nomes, e não apenas os IDs
        paciente: { select: { nome: true } },
        medico: { select: { nome: true } },
      },
      orderBy: {
        horaInicio: 'desc', // Mostra os mais recentes primeiro
      },
    });

    res.status(200).json(historico);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar histórico.', error: error.message });
  }
};