import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Package, Calendar, DollarSign, Clock, Info, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Orders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await api.get('/pedidos');
        setPedidos(response.data);
      } catch (err) {
        console.error('Erro ao carregar pedidos:', err);
        setError('Não foi possível carregar seus pedidos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'entregue': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'cancelado': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'processando': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-4">
              <Package className="text-blue-500 w-10 h-10" />
              Meus Pedidos
            </h1>
            <p className="text-zinc-500 mt-2 text-lg">Acompanhe suas compras e histórico</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-zinc-500 font-medium">Buscando histórico...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/5 border border-red-500/20 p-12 rounded-3xl text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-400 font-medium">{error}</p>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-24 rounded-[2.5rem] text-center shadow-inner">
            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Você ainda não fez nenhum pedido</h3>
            <p className="text-zinc-500 max-w-sm mx-auto">Explore nossa vitrine e comece a comprar agora mesmo!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pedidos.map((pedido) => (
              <div 
                key={pedido.id} 
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <ShoppingBag className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Pedido #{pedido.id.toString().padStart(6, '0')}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(pedido.data_pedido || new Date())}</span>
                        <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                        <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> Total: R$ {pedido.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 self-end md:self-center">
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(pedido.status || 'Pendente')}`}>
                      {pedido.status || 'Pendente'}
                    </div>
                    <button className="text-zinc-400 hover:text-white transition-colors group/btn flex items-center gap-2 font-medium">
                      Ver detalhes
                      <Info className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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

export default Orders;
