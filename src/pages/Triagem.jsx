import { useEffect, useState } from "react";

function Triagem() {
  const [fila, setFila] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("fila")) || [];
    setFila(ordenarFila(dados));

    const interval = setInterval(() => {
      const atualizaFila = JSON.parse(localStorage.getItem("fila")) || [];
      setFila(ordenarFila(atualizaFila));
    }, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(interval);
  }, []);

  const ordenarFila = (dados) => {
    const prioridade = { vermelho: 1, amarelo: 2, verde: 3 };
    return dados.sort((a, b) => prioridade[a.prioridade] - prioridade[b.prioridade]);
  };

  const calcularTempoEspera = (horaEntrada) => {
    const entrada = new Date(horaEntrada);
    const agora = new Date();
    const diffMs = agora - entrada;
    const minutos = Math.floor(diffMs / 60000);
    return `${minutos} min`;
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Fila de Triagem</h2>
      <div className="flex flex-col gap-4">
        {fila.length === 0 && <p>Fila vazia.</p>}
        {fila.map((paciente) => (
          <div
            key={paciente.id}
            className={`border-l-8 p-4 rounded shadow 
              ${paciente.prioridade === "vermelho"
                ? "border-red-600"
                : paciente.prioridade === "amarelo"
                ? "border-yellow-400"
                : "border-green-600"
              }`}
          >
            <p><strong>Nome:</strong> {paciente.nome}</p>
            <p><strong>Motivo:</strong> {paciente.motivo}</p>
            <p><strong>Prioridade:</strong> {paciente.prioridade}</p>
            <p><strong>Status:</strong> {paciente.status}</p>
            <p><strong>Tempo de Espera:</strong> {calcularTempoEspera(paciente.horaEntrada)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Triagem;
