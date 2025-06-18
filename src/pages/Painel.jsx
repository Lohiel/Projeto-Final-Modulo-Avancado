import { useEffect, useState } from "react";

function Painel() {
  const [fila, setFila] = useState([]);

  useEffect(() => {
    const atualizarFila = () => {
      const dados = JSON.parse(localStorage.getItem("fila")) || [];
      setFila(ordenarFila(dados));
    };

    atualizarFila();

    const interval = setInterval(() => {
      atualizarFila();
    }, 10000); // Atualiza a cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const ordenarFila = (dados) => {
    const prioridade = { vermelho: 1, amarelo: 2, verde: 3 };
    return dados.sort((a, b) => prioridade[a.prioridade] - prioridade[b.prioridade]);
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h2 className="text-5xl font-bold mb-10 text-center text-blue-700">
        🏥 Bem-vindo ao Hospital
      </h2>

      <p className="text-center text-2xl mb-10 text-blue-600">
        Seu atendimento será realizado em breve. Por favor, aguarde!
      </p>

      {fila.length === 0 && (
        <p className="text-center text-3xl text-blue-600">Nenhum paciente na fila agora.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fila.map((paciente, index) => (
          <div
            key={paciente.id}
            className="bg-white border-l-8 border-blue-600 p-6 rounded shadow text-center"
          >
            <h3 className="text-3xl font-bold mb-2">{paciente.nome}</h3>
            <p className="text-lg">Posição na fila: {index + 1}</p>
            <p className="text-sm text-slate-500">Estamos cuidando de você ❤️</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Painel;
