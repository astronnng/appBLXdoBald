import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, User, LogOut, PlusCircle, Package, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <ShoppingBag className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">BLX</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
                <Home className="w-4 h-4" />
                Explorar
              </Link>
              {user && (
                <>
                  <Link to="/pedidos" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
                    <Package className="w-4 h-4" />
                    Meus Pedidos
                  </Link>
                  <Link to="/vender" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
                    <PlusCircle className="w-4 h-4" />
                    Anunciar
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/perfil" className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl border border-zinc-700 transition-colors">
                  <div className="w-8 h-8 bg-zinc-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-zinc-300" />
                  </div>
                  <span className="text-sm font-medium text-white md:block hidden">Olá, {user.nome}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-zinc-400 hover:text-white text-sm font-semibold px-4 py-2">
                  Entrar
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
