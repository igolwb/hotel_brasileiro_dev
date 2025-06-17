import React, { useEffect, useState } from 'react';
import useApiStore from '../../../services/api.js';
import AdminHeader from '../HeaderAdmin/adminHeader.js';
import useAuthAdmin from '../../../hooks/adminAuth.js';
import './clientePage.css';

const USERS_PER_PAGE = 10;

function Clientes() {
  // Hook customizado para autenticação de admin
  const { authUser, authHeader } = useAuthAdmin();
  
  // Hooks e métodos da store de API para clientes
  const {
    clientes,
    loading,
    fetchClientes,
  } = useApiStore();

  // Estado para controlar a página atual da paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Busca os clientes ao carregar o componente ou quando o admin muda
  useEffect(() => {
    if (authUser) {
      fetchClientes(authHeader);
    }
  }, [fetchClientes, authUser, authHeader]);

  // Calcula o índice do primeiro e último usuário da página atual
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;

  // Lista de clientes da página atual
  const currentUsers = clientes.slice(indexOfFirstUser, indexOfLastUser);

  // Calcula o total de páginas para a paginação
  const totalPages = Math.ceil(clientes.length / USERS_PER_PAGE);

  // Calcula quantas linhas vazias preencher para manter a tabela alinhada
  const linhasVazias = Math.max(0, USERS_PER_PAGE - currentUsers.length);

  return (
    <>
      <AdminHeader />
      <div className="clientes-container">
        <h1 className="clientes-title">Clientes</h1>
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Senha</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>Carregando...</td>
              </tr>
            ) : (
              <>
                {currentUsers.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.senha.length > 19 ? cliente.senha.slice(0, 19) + '...' : cliente.senha}</td>
                    <td>{cliente.role}</td>
                  </tr>
                ))}
                {Array.from({ length: linhasVazias }).map((_, idx) => (
                  <tr key={`empty-${idx}`}>
                    <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>

        <div className="pagination">
          {/* Botão de paginação anterior: diminui a página atual */}
          <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Anterior</button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button key={idx} className={`pagination-btn ${currentPage === idx + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
          ))}
          {/* Botão de paginação próximo: aumenta a página atual */}
          <button className="pagination-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Próxima</button>
        </div>

      </div>
    </>
  );
}

export default Clientes;
