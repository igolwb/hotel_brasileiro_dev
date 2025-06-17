// src/hooks/useAuthAdmin.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'; // Importe o hook useAuthHeader

export default function useAuthAdmin() {
  const authUser = useAuthUser();
  const authHeader = useAuthHeader(); // Inicialize o hook useAuthHeader
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      // Usuário não está logado
      navigate('/login');
    } else if (authUser.role !== 'admin') {
      // Usuário não é admin
      alert('Acesso negado: você não tem permissão para acessar esta página.');
      navigate('/');
    }
  }, [authUser, navigate]);

  return { authUser, authHeader }; // Retorne tanto authUser quanto authHeader
}
