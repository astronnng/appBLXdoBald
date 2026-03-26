import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, ShoppingCart, Package, Settings, Camera, Loader2, AlertCircle } from 'lucide-react';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/login/me');
        setProfileData(response.data);
      } catch (err) {
        console.error('Erro ao carregar perfil:', err);
        setError('Não foi possível carregar os dados do seu perfil.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-zinc-500 font-medium">Carregando seu perfil...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 p-12 rounded-3xl text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Header / Avatar Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-10 relative">
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-800 rounded-[2.5rem] border-4 border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl">
                    <User className="w-16 h-16 md:w-20 md:h-20 text-zinc-600" />
                  </div>
                  <button className="absolute bottom-2 right-2 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-lg transition-all scale-0 group-hover:scale-100">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-black text-white mb-2">{profileData.nome}</h1>
                  <p className="text-blue-500 font-semibold mb-6">Membro do BLX desde {new Date().getFullYear()}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="bg-zinc-800 px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {profileData.telefone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Anúncios Ativos', value: profileData.meus_produtos?.length || 0, icon: Package, color: 'text-blue-500' },
                { label: 'Compras Realizadas', value: profileData.meus_pedidos?.length || 0, icon: ShoppingCart, color: 'text-emerald-500' },
                { label: 'Vendas Concluídas', value: profileData.minhas_vendas?.length || 0, icon: DollarSign, color: 'text-amber-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-zinc-700 transition-colors">
                  <stat.icon className={`${stat.color} w-8 h-8 mb-4`} />
                  <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                  <p className="text-zinc-500 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Menu Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white px-2">Configurações da Conta</h3>
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
                  <button className="w-full flex items-center justify-between p-6 hover:bg-zinc-800 transition-colors border-b border-zinc-800">
                    <div className="flex items-center gap-4 text-zinc-300 font-medium">
                      <Settings className="w-5 h-5" /> Editar Dados do Perfil
                    </div>
                    <span className="text-zinc-600">→</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-6 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-4 text-zinc-300 font-medium">
                      <Lock className="w-5 h-5" /> Alterar Senha
                    </div>
                    <span className="text-zinc-600">→</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white px-2">Suporte e Ajuda</h3>
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
                  <button className="w-full flex items-center justify-between p-6 hover:bg-zinc-800 transition-colors border-b border-zinc-800">
                    <div className="flex items-center gap-4 text-zinc-300 font-medium">
                      <Info className="w-5 h-5" /> Central de Ajuda
                    </div>
                    <span className="text-zinc-600">→</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-6 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center gap-4 text-zinc-300 font-medium">
                      <AlertCircle className="w-5 h-5" /> Termos de Uso
                    </div>
                    <span className="text-zinc-600">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
