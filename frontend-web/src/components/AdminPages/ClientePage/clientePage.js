import React, { useEffect, useState } from 'react';
import useApiStore from '../../../services/api.js';
import AdminHeader from '../HeaderAdmin/adminHeader.js';
import { useNavigate } from 'react-router-dom';
import useAuthAdmin from '../../../hooks/adminAuth.js';
import './clientePage.css';

const USERS_PER_PAGE = 10;

function Clientes() {
  const { authUser, authHeader } = useAuthAdmin();
  const navigate = useNavigate();

  const {
    clientes,
    loading,
    fetchClientes,
  } = useApiStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reservasCliente, setReservasCliente] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    if (authUser) {
      fetchClientes(authHeader);
    }
  }, [fetchClientes, authUser, authHeader]);

  async function abrirModal(cliente) {
    setSelectedCliente(cliente);
    const reservas = await useApiStore.getState().fetchReservasCliente(cliente.id, authHeader);
    setReservasCliente(reservas);
    setShowModal(true);
  }

  function fecharModal() {
    setShowModal(false);
    setReservasCliente([]);
    setSelectedCliente(null);
  }

  function handleEditReserva(reserva) {
    navigate(`/admin/reservas/${reserva.id}`);
  }

  function formatarData(dataStr) {
    if (!dataStr) return '';
    const data = new Date(dataStr);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  async function handleDeleteReserva(reserva) {
    alert('Excluir reserva: ' + reserva.id);
  }

  const filteredClientes = clientes.filter(cliente =>
    cliente.email.toLowerCase().includes(search.toLowerCase()) ||
    cliente.id.toString().includes(search)
  );

  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = filteredClientes.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredClientes.length / USERS_PER_PAGE);
  const linhasVazias = Math.max(0, USERS_PER_PAGE - currentUsers.length);

  return (
    <>
      <AdminHeader />
      <div className="clientes-container">
        <h1 className="clientes-title">Clientes</h1>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por ID ou Email"
          className="clientes-search-box"
          style={{ marginBottom: '16px', padding: '8px', width: '100%', maxWidth: '400px' }}
        />
        <table className="clientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Role</th>
              <th>Ações</th>
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
                    <td>{cliente.role}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => abrirModal(cliente)}
                        className="ver-reservas-btn"
                      >
                        Ver Reservas
                      </button>
                    </td>
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
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`pagination-btn ${currentPage === idx + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>

        {showModal && (
          <div className="modal-bg" onClick={fecharModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>Reservas de {selectedCliente?.nome}</h2>
              {reservasCliente.length > 0 ? (
                <table className="reservas-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Quarto</th>
                      <th>Início</th>
                      <th>Fim</th>
                      <th>Preço</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservasCliente.map((reserva) => (
                      <tr key={reserva.id}>
                        <td>{reserva.id}</td>
                        <td>{reserva.quarto_nome}</td>
                        <td>{formatarData(reserva.inicio)}</td>
                        <td>{formatarData(reserva.fim)}</td>
                        <td>{reserva.preco_total}</td>
                        <td>
                          <button
                            className="edit-reserva-btn"
                            onClick={() => handleEditReserva(reserva)}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Nenhuma reserva encontrada para este cliente.</p>
              )}
              <div className="modal-actions">
                <button className="btn-cancel" onClick={fecharModal}>Fechar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Clientes;
