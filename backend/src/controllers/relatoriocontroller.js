import prisma from '../prismaClient.js';
import { Parser } from 'json2csv';

export const gerarRelatorio = async (req, res) => {
  try {
    // Busca todos os atendimentos finalizados com os dados necessários
    const atendimentosFinalizados = await prisma.atendimento.findMany({
      where: { status: 'ATENDIDO' },
      include: {
        paciente: true, // Inclui todos os dados do paciente
        medico: { select: { nome: true } }, // Apenas o nome do médico
      },
    });

    if (atendimentosFinalizados.length === 0) {
      return res.status(200).json({ message: 'Nenhum atendimento finalizado para gerar relatório.' });
    }

    // --- CÁLCULO 1: Pacientes atendidos por médico ---
    const pacientesPorMedico = atendimentosFinalizados.reduce((acc, atendimento) => {
      const nomeMedico = atendimento.medico.nome;
      acc[nomeMedico] = (acc[nomeMedico] || 0) + 1;
      return acc;
    }, {});

    // --- CÁLCULO 2: Quantidade de pacientes por prioridade ---
    const pacientesPorPrioridade = atendimentosFinalizados.reduce((acc, atendimento) => {
      const prioridade = atendimento.paciente.prioridade;
      acc[prioridade] = (acc[prioridade] || 0) + 1;
      return acc;
    }, {});

    // --- CÁLCULO 3: Tempo médio de espera ---
    const totalMinutosEspera = atendimentosFinalizados.reduce((acc, atendimento) => {
      const dataCadastro = new Date(atendimento.paciente.dataCadastro);
      const horaInicio = new Date(atendimento.horaInicio);
      const diffMs = horaInicio - dataCadastro; // Diferença em milissegundos
      const diffMins = Math.round(diffMs / 60000); // Converte para minutos
      return acc + diffMins;
    }, 0);
    const tempoMedioEsperaMinutos = Math.round(totalMinutosEspera / atendimentosFinalizados.length);

    // --- Montando o JSON final ---
    const relatorioJson = {
      pacientesAtendidosPorMedico: pacientesPorMedico,
      quantidadePacientesPorPrioridade: pacientesPorPrioridade,
      tempoMedioDeEsperaEmMinutos: tempoMedioEsperaMinutos,
    };

    // --- Verificando o formato de saída ---
    const { format } = req.query; // Pega o formato da URL, ex: ?format=csv

    if (format === 'csv') {
      // Transforma o JSON em um formato que o json2csv entende
      const dadosParaCsv = [
        { metrica: 'Tempo Médio de Espera (min)', valor: tempoMedioEsperaMinutos },
        ...Object.entries(pacientesPorMedico).map(([medico, quantidade]) => ({
          metrica: `Pacientes atendidos por ${medico}`,
          valor: quantidade,
        })),
        ...Object.entries(pacientesPorPrioridade).map(([prioridade, quantidade]) => ({
          metrica: `Pacientes com prioridade ${prioridade}`,
          valor: quantidade,
        })),
      ];

      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(dadosParaCsv);

      res.header('Content-Type', 'text/csv');
      res.attachment('relatorio_estatisticas.csv');
      return res.send(csv);
    }

    // Por padrão, retorna JSON
    res.status(200).json(relatorioJson);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório.', error: error.message });
  }
};