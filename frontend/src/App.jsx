import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Triagem from "./pages/Triagem";
import Atendimento from "./pages/Atendimento";
import Painel from "./pages/Painel";
import Header from "./components/Header";
import ConsultaRemedios from "./pages/ConsultaRemedios";
import LoginPage from "./pages/LoginPage";
import TriagemPage from "./pages/TriagemPage";


function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/triagem" element={<Triagem />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/painel" element={<Painel />} />
          <Route path="/consulta" element={<ConsultaRemedios />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/triagem-dev" element={<TriagemPage />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
