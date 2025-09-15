import { useState, useRef } from "react";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [motivo, setMotivo] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const inputNomeRef = useRef(null);

  const handleCadastro = () => {
    setErro("");
    setSucesso("");

    if (!nome.trim() || !motivo.trim() || !prioridade) {
      setErro("⚠️ Preencha todos os campos e escolha a prioridade.");
      return;
    }

    const dataEntrada = new Date();

    const ficha = {
      id: Date.now(),
      nome: nome.trim(),
      motivo: motivo.trim(),
      prioridade: prioridade,
      status: "Aguardando",
      horaEntrada: dataEntrada.toISOString(),
    };

    const fila = JSON.parse(localStorage.getItem("fila")) || [];
    fila.push(ficha);
    localStorage.setItem("fila", JSON.stringify(fila));

    setNome("");
    setMotivo("");
    setPrioridade("");
    setSucesso(`✅ Paciente "${ficha.nome}" cadastrado com sucesso!`);
    inputNomeRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCadastro();
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Cadastro de Paciente</h2>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          ref={inputNomeRef}
          className="border p-2 rounded focus:outline-blue-500"
          placeholder="Nome do Paciente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="border p-2 rounded focus:outline-blue-500"
          placeholder="Motivo da Visita"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <select
          className="border p-2 rounded focus:outline-blue-500"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
        >
          <option value="">Selecione a Prioridade</option>
          <option value="vermelho">🔴 Vermelho - Emergência</option>
          <option value="amarelo">🟡 Amarelo - Moderado</option>
          <option value="verde">🟢 Verde - Leve</option>
        </select>

        <button
          onClick={handleCadastro}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Registrar Paciente
        </button>

        {erro && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
            {erro}
          </div>
        )}
        {sucesso && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded">
            {sucesso}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cadastro;
