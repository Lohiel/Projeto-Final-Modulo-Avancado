import { useEffect, useState } from "react";

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
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Atendimento Médico</h2>

      {atual ? (
        <div className="bg-green-100 p-6 rounded">
          <h3 className="text-2xl font-bold mb-2">Paciente em Atendimento</h3>
          <p><strong>Nome:</strong> {atual.nome}</p>
          <p><strong>Motivo:</strong> {atual.motivo}</p>
          <p><strong>Prioridade:</strong> {atual.prioridade}</p>
        </div>
      ) : (
        <p>Nenhum paciente em atendimento.</p>
      )}

      <button
        onClick={chamarProximo}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
      >
        Chamar Próximo
      </button>
    </div>
  );
}

export default Atendimento;
