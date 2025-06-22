import React, { useEffect, useState } from 'react';
import './TriagemPage.css';
import { useNavigate } from 'react-router-dom';

const TriagemPage = () => {
  const [pacientes, setPacientes] = useState([]);
  // Nova caixinha de memória para o texto da busca
  const [termoBusca, setTermoBusca] = useState(''); // Começa vazio
  const navigate = useNavigate();

  useEffect(() => {
    const pacientesSalvos = JSON.parse(localStorage.getItem('pacientes')) || [];
    setPacientes(pacientesSalvos);
  }, []);

  const chamarProximoPaciente = () => {
    if (pacientes.length === 0) {
      alert('Nenhum paciente na fila!');
      return;
    }

    const coresPrioridade = ['Vermelho', 'Amarelo', 'Verde'];
    let proximo = null;

    for (let cor of coresPrioridade) {
      proximo = pacientes.find(p => p.cor === cor && p.status === 'Aguardando');
      if (proximo) break;
    }

    if (proximo) {
      const novosPacientes = pacientes.map(p => {
        if (p.nomeReal === proximo.nomeReal) { // Usamos nomeReal para identificar o paciente
          return { ...p, status: 'Em atendimento' };
        }
        return p;
      });

      setPacientes(novosPacientes);
      localStorage.setItem('pacientes', JSON.stringify(novosPacientes));
      // alert(`Chamando paciente: ${proximo.nomeReal}`); // Remover alert
    } else {
      alert('Nenhum paciente aguardando atendimento.');
    }
  };

  const mudarCorTriagem = (index, novaCor) => {
    const novosPacientes = [...pacientes];
    novosPacientes[index].cor = novaCor;
    setPacientes(novosPacientes);
    localStorage.setItem('pacientes', JSON.stringify(novosPacientes));
  };

  const finalizarAtendimento = (index) => {
    const novosPacientes = [...pacientes];
    novosPacientes[index].status = 'Atendido';
    setPacientes(novosPacientes);
    localStorage.setItem('pacientes', JSON.stringify(novosPacientes));
  };

  const limparTodosPacientes = () => {
    const confirmacao = window.confirm('Tem certeza que deseja apagar TODOS os pacientes? Essa ação não pode ser desfeita!');
    if (confirmacao) {
      localStorage.removeItem('pacientes');
      setPacientes([]);
    }
  };

  const limparHistorico = () => {
    const confirmacao = window.confirm('Tem certeza que deseja limpar apenas o histórico de pacientes atendidos?');
    if (confirmacao) {
      const pacientesRestantes = pacientes.filter(p => p.status !== 'Atendido');
      setPacientes(pacientesRestantes);
      localStorage.setItem('pacientes', JSON.stringify(pacientesRestantes));
    }
  };

  const sair = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const exportarParaExcel = () => {
    if (pacientes.length === 0) {
      alert('Não tem nenhum paciente para guardar no Excel ainda!');
      return;
    }

    const cabecalhos = ["Tipo", "Nome do Paciente", "Motivo", "Cor", "Status"];

    const conteudoCSV = [
      cabecalhos.join(","),
      // Usando p.nome para "Tipo" e p.nomeReal para "Nome do Paciente"
      ...pacientes.map(p => `${p.nome},${p.nomeReal},${p.motivo},${p.cor},${p.status}`)
    ].join("\n");

    const pacoteDeDados = new Blob([conteudoCSV], { type: 'text/csv;charset=utf-8;' });

    const linkInvisivel = document.createElement("a");

    if (linkInvisivel.download !== undefined) {
      const enderecoDoPacote = URL.createObjectURL(pacoteDeDados);
      linkInvisivel.setAttribute("href", enderecoDoPacote);
      linkInvisivel.setAttribute("download", "pacientes_do_consultorio.csv");
      linkInvisivel.style.visibility = 'hidden';
      document.body.appendChild(linkInvisivel);
      linkInvisivel.click();
      document.body.removeChild(linkInvisivel);
      URL.revokeObjectURL(enderecoDoPacote);
    } else {
      alert('Seu navegador é um pouco antigo para baixar o arquivo automaticamente. Por favor, copie os dados manualmente.');
    }
  };

  // Prepara o texto da busca: transforma para letras minúsculas para não se importar com maiúsculas/minúsculas
  const termoBuscaLowerCase = termoBusca.toLowerCase();

  // Separando pacientes ativos (Fila) e pacientes atendidos (Histórico)
  // E AGORA, FILTRANDO POR O QUE FOI DIGITADO NA BUSCA!
  const pacientesAtivos = pacientes.filter(p =>
    p.status !== 'Atendido' && // Mantém o filtro original por status
    (
      p.nome.toLowerCase().includes(termoBuscaLowerCase) ||      // Busca pelo 'Tipo' do paciente
      p.nomeReal.toLowerCase().includes(termoBuscaLowerCase) ||  // Busca pelo 'Nome Real' do paciente
      p.motivo.toLowerCase().includes(termoBuscaLowerCase)       // Busca pelo 'Motivo' da consulta
    )
  );

  const pacientesAtendidos = pacientes.filter(p =>
    p.status === 'Atendido' && // Mantém o filtro original por status
    (
      p.nome.toLowerCase().includes(termoBuscaLowerCase) ||      // Busca pelo 'Tipo' do paciente
      p.nomeReal.toLowerCase().includes(termoBuscaLowerCase) ||  // Busca pelo 'Nome Real' do paciente
      p.motivo.toLowerCase().includes(termoBuscaLowerCase)       // Busca pelo 'Motivo' da consulta
    )
  );

  return (
    <div className="triagem-container">
      <h2>Painel de Triagem de Pacientes</h2>
      <p className="subtitle">Gerencie a fila de atendimento e as prioridades dos pacientes</p>

      <div className="logout-button-container">
        <button onClick={sair} className="logout-btn">Sair</button>
      </div>

      <div className="botoes-topo">
        <button onClick={chamarProximoPaciente} className="chamar-proximo-btn">Chamar Próximo Paciente</button>
        <button onClick={exportarParaExcel} className="exportar-excel-btn">Exportar para Excel</button>
        <button onClick={limparHistorico} className="limpar-historico-btn">Limpar Histórico de Atendidos</button>
        <button onClick={limparTodosPacientes} className="limpar-btn">Limpar Todos os Pacientes</button>
      </div>

      <div className="busca-container">
        <input
          type="text"
          placeholder="Buscar paciente por nome, tipo ou motivo..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="campo-busca"
        />
      </div>

      {/* Lista de pacientes na fila */}
      <h3>Pacientes na Fila de Atendimento</h3>
      {pacientesAtivos.length === 0 ? (
        <p>Nenhum paciente aguardando atendimento.</p>
      ) : (
        <ul>
          {pacientesAtivos.map((paciente) => {
            // Usamos nomeReal para encontrar o índice e garantir unicidade
            const index = pacientes.findIndex(p => p.nomeReal === paciente.nomeReal); 
            return (
              <li key={paciente.nomeReal} className={`triagem-item ${paciente.cor.toLowerCase()}`}>
                <strong>Tipo:</strong> {paciente.nome} <br />
                <strong>Nome do Paciente:</strong> {paciente.nomeReal} <br />
                <strong>Motivo:</strong> {paciente.motivo} <br />
                <strong>Cor:</strong> {paciente.cor} <br />
                <strong>Status:</strong> {paciente.status} <br />

                <label>Alterar Cor:</label>
                <select
                  value={paciente.cor}
                  onChange={(e) => mudarCorTriagem(index, e.target.value)}
                >
                  <option value="Vermelho">Vermelho</option>
                  <option value="Amarelo">Amarelo</option>
                  <option value="Verde">Verde</option>
                </select>

                {paciente.status === 'Em atendimento' && (
                  <button onClick={() => finalizarAtendimento(index)} className="finalizar-btn">
                    Finalizar Atendimento
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Histórico de atendidos */}
      <h3>Histórico de Pacientes Atendidos</h3>
      {pacientesAtendidos.length === 0 ? (
        <p>Nenhum paciente atendido ainda.</p>
      ) : (
        <ul>
          {pacientesAtendidos.map((paciente, index) => (
            <li key={paciente.nomeReal || index} className={`triagem-item ${paciente.cor.toLowerCase()}`}>
              <strong>Tipo:</strong> {paciente.nome} <br />
              <strong>Nome do Paciente:</strong> {paciente.nomeReal} <br />
              <strong>Motivo:</strong> {paciente.motivo} <br />
              <strong>Cor:</strong> {paciente.cor} <br />
              <strong>Status:</strong> {paciente.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TriagemPage;