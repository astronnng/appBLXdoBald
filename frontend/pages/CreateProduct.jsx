import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, Package, DollarSign, Info, Check, Loader2, AlertCircle } from 'lucide-react';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    nome: '',
    detalhes: '',
    preco: '',
    disponivel: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.nome || !formData.detalhes || !formData.preco) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/produtos', {
        ...formData,
        preco: parseFloat(formData.preco),
        usuario_id: user.id
      });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      setError(err.response?.data?.detail || 'Erro ao publicar produto. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
              <PlusCircle className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Anunciar Novo Produto</h1>
              <p className="text-zinc-400">Preencha os dados abaixo para publicar no marketplace</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-5 rounded-2xl mb-8 flex items-center gap-4 animate-shake">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 p-8 rounded-2xl mb-8 text-center animate-bounce">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sucesso!</h3>
              <p>Produto publicado com sucesso. Redirecionando...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <Package className="w-4 h-4" /> Nome do Produto
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
                placeholder="Ex: Teclado Mecânico RGB"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <Info className="w-4 h-4" /> Detalhes e Descrição
              </label>
              <textarea
                name="detalhes"
                value={formData.detalhes}
                onChange={handleChange}
                rows="4"
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600 resize-none"
                placeholder="Descreva o estado, características e especificações do produto..."
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Preço (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">R$</span>
                  <input
                    type="number"
                    step="0.01"
                    name="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    className="w-full bg-zinc-800/50 border border-zinc-700 text-white p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
                    placeholder="0,00"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-zinc-800/30 border border-zinc-800 p-4 rounded-xl self-end h-[58px]">
                <input
                  type="checkbox"
                  id="disponivel"
                  name="disponivel"
                  checked={formData.disponivel}
                  onChange={handleChange}
                  className="w-6 h-6 rounded-lg bg-zinc-700 border-zinc-600 text-blue-600 focus:ring-blue-500/50 transition-all cursor-pointer"
                />
                <label htmlFor="disponivel" className="text-sm font-semibold text-zinc-300 cursor-pointer select-none">
                  Produto Disponível para Venda
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading || success}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publicar Anúncio'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;
