import { useEffect, useState } from "react";
import "../styles/Atendimento.css";

function Atendimento() {
  const [fila, setFila] = useState([]);
  const [atual, setAtual] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("fila")) || [];
    setFila(ordenarFila(dados));
  }, []);

  const ordenarFila = (dados) => {
    const prioridade = { vermelho: 1, amarelo: 2, verde: 3 };
    return dados.sort((a, b) => prioridade[a.prioridade] - prioridade[b.prioridade]);
  };

  const chamarProximo = () => {
    if (fila.length === 0) {
      setAtual(null);
      alert("Fila vazia!");
      return;
    }

    const proximo = fila[0];
    setAtual(proximo);

    const novaFila = fila.slice(1);
    setFila(novaFila);
    localStorage.setItem("fila", JSON.stringify(novaFila));
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
