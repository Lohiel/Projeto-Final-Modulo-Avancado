import { useEffect, useState } from "react";
import api from "../services/api";

function Painel() {
  const [fila, setFila] = useState([]);

  useEffect(() => {
    const carregarFila = async () => {
      try {
        const res = await api.get("/pacientes"); // pega pacientes com status 'Aguardando Atendimento'
        setFila(ordenarFila(res.data));
      } catch (err) {
        console.error("Erro ao carregar fila:", err);
      }
    };

    carregarFila();

    const interval = setInterval(carregarFila, 10000); // Atualiza a cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  const ordenarFila = (dados) => {
    // Prioridade como número (1 = vermelho, 2 = amarelo, 3 = verde)
    return [...dados].sort((a, b) => a.prioridade - b.prioridade);
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h2 className="text-5xl font-bold mb-10 text-center text-blue-700">
        🏥 Bem-vindo ao Hospital
      </h2>

      <p className="text-center text-2xl mb-10 text-blue-600">
        Seu atendimento será realizado em breve. Por favor, aguarde!
      </p>

      {fila.length === 0 ? (
        <p className="text-center text-3xl text-blue-600">Nenhum paciente na fila agora.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fila.map((paciente, index) => (
            <div
              key={paciente.id}
              className={`bg-white border-l-8 p-6 rounded shadow text-center ${
                paciente.prioridade === 1
                  ? "border-red-600"
                  : paciente.prioridade === 2
                  ? "border-yellow-400"
                  : "border-green-600"
              }`}
            >
              <h3 className="text-3xl font-bold mb-2">{paciente.nome}</h3>
              <p className="text-lg">Posição na fila: {index + 1}</p>
              <p className="text-sm text-slate-500">Estamos cuidando de você ❤️</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Painel;
