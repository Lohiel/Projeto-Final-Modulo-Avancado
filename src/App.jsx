import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Triagem from "./pages/Triagem";
import Atendimento from "./pages/Atendimento";
import Painel from "./pages/Painel";
import Header from "./components/Header";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
