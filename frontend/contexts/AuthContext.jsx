import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('blx_token');
    const savedUser = localStorage.getItem('blx_user');

    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (telefone, senha) => {
    try {
      const response = await api.post('/login', { telefone, senha });
      const { acesso_token, usuario } = response.data;

      localStorage.setItem('blx_token', acesso_token);
      localStorage.setItem('blx_user', JSON.stringify(usuario));
      setUser(usuario);
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        message: error.response?.data?.detail || 'Erro ao realizar login' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('blx_token');
    localStorage.removeItem('blx_user');
    setUser(null);
  };

  const signup = async (userData) => {
    try {
      await api.post('/usuarios', {
        ...userData,
        meus_produtos: [],
        minhas_vendas: [],
        meus_pedidos: []
      });
      return { success: true };
    } catch (error) {
      console.error('Erro no cadastro:', error);
      return { 
        success: false, 
        message: error.response?.data?.detail || 'Erro ao realizar cadastro' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
