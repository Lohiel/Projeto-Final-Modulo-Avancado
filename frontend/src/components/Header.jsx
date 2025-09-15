import { Link } from "react-router-dom";
import { Stethoscope, UserPlus, ClipboardList, UserCog, Monitor } from "lucide-react";

function Header() {
  return (
    <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.05%3E%3Ccircle cx=7 cy=7 r=1/%3E%3Ccircle cx=53 cy=7 r=1/%3E%3Ccircle cx=7 cy=53 r=1/%3E%3Ccircle cx=53 cy=53 r=1/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse opacity-10"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="relative container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo e título */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/30 to-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Stethoscope className="w-8 h-8 drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                Sistema Hospitalar
              </h1>
              <p className="text-blue-100 text-sm font-medium tracking-wide opacity-90">
                Gestão Inteligente de Saúde
              </p>
            </div>
          </div>

          {/* Navegação */}
          <nav className="hidden md:flex gap-2">
            <Link
              to="/"
              className="group flex items-center gap-2 px-5 py-3 rounded-xl hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Cadastro</span>
            </Link>

            <Link
              to="/triagem"
              className="group flex items-center gap-2 px-5 py-3 rounded-xl hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Triagem</span>
            </Link>

            <Link
              to="/atendimento"
              className="group flex items-center gap-2 px-5 py-3 rounded-xl hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <UserCog className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Atendimento</span>
            </Link>

            <Link
              to="/painel"
              className="group relative flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-white/25 to-white/15 hover:from-white/35 hover:to-white/25 transition-all duration-300 transform hover:scale-105 shadow-xl ring-2 ring-white/40 hover:ring-white/60"
            >
              <Monitor className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold">Painel</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
            </Link>
          </nav>
        </div>

        <div className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4"></div>
      </div>
    </header>
  );
}

export default Header;
