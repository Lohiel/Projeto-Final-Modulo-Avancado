import { useEffect, useState } from "react";
import "../styles/Atendimento.css";
import api from "../services/api";

function Atendimento() {
  const [fila, setFila] = useState([]);
  const [atual, setAtual] = useState(null);

  const ordenarFila = (dados) => {
  // para prioridade como número (1,2,3)
  return [...dados].sort((a, b) => a.prioridade - b.prioridade);
  };

  useEffect(() => {
  const carregarFila = async () => {
    try {
      const res = await api.get("/pacientes");
      setFila(ordenarFila(res.data)); // agora aplica ordenação no front
    } catch (err) {
      console.error(err);
    }
  };
  carregarFila();
  }, []);

  // const ordenarFila = (dados) => {
  //   const prioridade = { vermelho: 1, amarelo: 2, verde: 3 };
  //   return dados.sort((a, b) => prioridade[a.prioridade] - prioridade[b.prioridade]);
  // };

  const chamarProximo = async () => {
  if (fila.length === 0) {
    setAtual(null);
    alert("Fila vazia!!!!");
    return;
  }

  const proximo = fila[0];
  setAtual(proximo);

  try {
    await api.patch(`/pacientes/${proximo.id}/status`, {
      status: "Em Atendimento",
    });
  } catch (err) {
    console.warn("Erro ao atualizar status:", err);
  }

  setFila(fila.slice(1));
};


  return (
    <div className="container-atendimento">
      <h2 className="titulo-atendimento">Atendimento Médico</h2>

      {atual ? (
        <div className="card-paciente">
          <h3>Paciente em Atendimento</h3>
          <p><strong>Nome:</strong> {atual.nome}</p>
          <p><strong>Motivo:</strong> {atual.motivo}</p>
          <p><strong>Prioridade:</strong> {atual.prioridade}</p>
        </div>
      ) : (
        <p className="texto-nenhum">Nenhum paciente em atendimento.</p>
      )}

      <button onClick={chamarProximo} className="botao-chamar">
        Chamar Próximo
      </button>
      
    </div>
  );
}

export default Atendimento;
