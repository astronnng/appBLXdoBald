import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { ShoppingBag, Loader2, AlertCircle, ShoppingCart, Tag } from 'lucide-react';

const Dashboard = () => {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Não foi possível carregar os produtos. Verifique se o backend está rodando.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-4">
            <Tag className="text-blue-500 w-10 h-10" />
            Vitrine BLX
          </h1>
          <p className="text-zinc-400 mt-3 text-lg max-w-2xl">
            Encontre os melhores produtos com os melhores preços. Negocie diretamente com os vendedores.
          </p>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-zinc-500 font-medium">Carregando catálogo...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 p-8 rounded-2xl text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ops! Algo deu errado</h3>
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-500/20 hover:bg-red-500/30 text-red-500 px-6 py-2 rounded-xl font-semibold transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        ) : produtos.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-20 rounded-3xl text-center">
            <ShoppingBag className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
            <p className="text-zinc-500">Seja o primeiro a anunciar um produto no BLX!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produtos.map((produto) => (
              <div 
                key={produto.id} 
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div className="h-48 bg-zinc-800 flex items-center justify-center relative">
                  <ShoppingBag className="w-16 h-16 text-zinc-700 group-hover:scale-110 transition-transform" />
                  {!produto.disponivel && (
                    <div className="absolute top-4 right-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      Esgotado
                    </div>
                  )}
                  {produto.disponivel && (
                    <div className="absolute top-4 right-4 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      Disponível
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                      {produto.nome}
                    </h3>
                  </div>
                  <p className="text-zinc-500 text-sm line-clamp-2 mb-6 h-10">
                    {produto.detalhes}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-800">
                    <div>
                      <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest block mb-1">Preço</span>
                      <span className="text-2xl font-black text-white">
                        R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <button 
                      disabled={!produto.disponivel}
                      className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 p-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
