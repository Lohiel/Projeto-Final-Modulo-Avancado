// src/pages/ConsultaRemedios.jsx
import { useState } from "react";
import axios from "axios";
import { Search, FileText, AlertCircle, Lightbulb } from "lucide-react";

export default function ConsultaRemedios() {
  const [busca, setBusca] = useState("");
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState("");

  const suggestions = [
    "Dipirona",
    "Paracetamol",
    "Ibuprofeno",
    "Aspirina",
    "Omeprazol",
  ];

  const buscarRemedio = async (termoRaw) => {
    const termoState = termoRaw ?? busca;
    const termo = termoState.trim().replace(/\s+/g, "_");
    if (!termo) {
      setErro("Digite o nome de um medicamento.");
      setResumo(null);
      return;
    }
    setErro("");
    setResumo(null);

    try {
      const { data } = await axios.get(
        `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          termo
        )}`
      );
      setResumo({
        titulo: data.title,
        descricao: data.extract,
        imagem: data.thumbnail?.source || null,
        url: data.content_urls.desktop.page,
      });
    } catch {
      setErro(`Nenhuma página encontrada para "${termoState}".`);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      {/* Título */}
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <Search className="w-6 h-6 text-blue-600" />
        Consulta de Medicamentos
      </h2>

      {/* Busca */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-3 rounded-lg shadow-sm focus:outline-blue-500"
          placeholder="Digite o nome do medicamento"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarRemedio()}
        />
        <button
          onClick={() => buscarRemedio()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          Buscar
        </button>
      </div>

      {/* Sugestões */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
        <div className="flex items-center text-gray-700 mb-3">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          Sugestões de Busca
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((sugg) => (
            <button
              key={sugg}
              onClick={() => buscarRemedio(sugg)}
              className="bg-white border border-gray-200 px-4 py-2 rounded-full text-gray-600 hover:bg-blue-50 hover:border-blue-200 transition"
            >
              {sugg}
            </button>
          ))}
        </div>
      </div>

      {/* Erro */}
      {erro && (
        <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded">
          <AlertCircle className="w-5 h-5" />
          {erro}
        </div>
      )}

      {/* Resultado */}
      {resumo && (
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div className="flex gap-4">
            {resumo.imagem && (
              <img
                src={resumo.imagem}
                alt={resumo.titulo}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div>
              <h3 className="text-2xl font-semibold">{resumo.titulo}</h3>
              <p className="text-gray-700">{resumo.descricao}</p>
            </div>
          </div>

          <a
            href={resumo.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            <FileText className="w-5 h-5" />
            Ler mais na Wikipedia
          </a>

          {/* Seção “Como utilizar” fixa */}
          <div className="pt-4 border-t">
            <h4 className="text-xl font-bold mb-2">Como utilizar</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Administre conforme prescrição médica ou orientação farmacêutica.</li>
              <li>Leia atentamente a bula completa acessando o link acima.</li>
              <li>Observe dosagens, horários e forma de administração indicados.</li>
              <li>Em caso de dúvidas ou efeitos adversos, procure um profissional de saúde.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
