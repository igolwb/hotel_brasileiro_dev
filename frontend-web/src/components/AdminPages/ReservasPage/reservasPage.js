import React, { useEffect, useState } from 'react';
import useApiStore from '../../../services/api.js';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../HeaderAdmin/adminHeader.js';
import './reservasPage.css';
import tabler_edit from '../../../assets/tabler_edit.svg';
import delete_btn from '../../../assets/delete_btn.svg';
import useAuthAdmin from '../../../hooks/adminAuth.js';

const RESERVAS_PER_PAGE = 10;

// Componente principal da página de reservas do admin
function AdminReservas() {
  // Hook customizado para autenticação de admin
  const { authUser, authHeader } = useAuthAdmin();
  // Hooks e métodos da store de API para reservas
  const {
    reservas,
    loading,
    fetchReservas,
    deleteReserva,
  } = useApiStore();

  // Estado para controlar a página atual da paginação
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estado para exibir o modal de confirmação de exclusão
  const [showModal, setShowModal] = useState(false);

  // Estado para armazenar a reserva selecionada para exclusão
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  const navigate = useNavigate();

  // Busca as reservas ao carregar o componente ou quando o admin muda
  useEffect(() => {
    if (authUser) {
      fetchReservas(authHeader);
    }
  }, [fetchReservas, authUser, authHeader]);

  // Calcula o índice do primeiro e último reserva da página atual
  const indexOfLastReserva = currentPage * RESERVAS_PER_PAGE;
  const indexOfFirstReserva = indexOfLastReserva - RESERVAS_PER_PAGE;

  // Lista de reservas da página atual
  const currentReservas = reservas.slice(indexOfFirstReserva, indexOfLastReserva);

  // Calcula o total de páginas para a paginação
  const totalPages = Math.ceil(reservas.length / RESERVAS_PER_PAGE);

  // Abre o modal de confirmação de exclusão para a reserva selecionada
  const abrirModal = (reserva) => {
    setReservaSelecionada(reserva);
    setShowModal(true);
  };

  // Fecha o modal de confirmação
  const fecharModal = () => {
    setShowModal(false);
    setReservaSelecionada(null);
  };

  // Confirma a exclusão da reserva selecionada
  const confirmarExclusao = () => {
    if (reservaSelecionada) {
      deleteReserva(reservaSelecionada.id);
      fecharModal();
    }
  };

  // Calcula quantas linhas vazias preencher para manter a tabela alinhada
  const linhasVazias = Math.max(0, RESERVAS_PER_PAGE - currentReservas.length);

  // Função utilitária para formatar datas no formato dd/mm/yyyy
  function formatarData(dataStr) {
    if (!dataStr) return '';
    const data = new Date(dataStr);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <>
      <AdminHeader />
      <div className="reservas-container">
        <h1 className="reservas-title">Reservas</h1>
        <table className="reservas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Quarto</th>
              <th>ID Cliente</th>
              <th>Hóspedes</th>
              <th>Início</th>
              <th>Fim</th>
              <th>Preço Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center' }}>Carregando...</td>
              </tr>
            ) : (
              <>
                {currentReservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{reserva.quarto_id}</td>
                    <td>{reserva.cliente_id}</td>
                    <td>{reserva.hospedes}</td>
                    <td>{formatarData(reserva.inicio)}</td>
                    <td>{formatarData(reserva.fim)}</td>
                    <td>{reserva.preco_total ? `R$ ${Number(reserva.preco_total).toFixed(2)}` : '-'}</td>
                    <td>
                      <button 
                        className="btn-trash" 
                        onClick={() => abrirModal(reserva)}
                      >
                        <img src={delete_btn} alt="Excluir" style={{ width: 28, height: 28 }}/>
                      </button>
                      <button 
                        className="btn-image" 
                        onClick={() => navigate(`/admin/reservas/${reserva.id}`)}
                      >
                        <img src={tabler_edit} alt="Editar" style={{ width: 28, height: 28 }}/>
                      </button>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: linhasVazias }).map((_, idx) => (
                  <tr key={`empty-${idx}`}>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button 
            className="pagination-btn" 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>

        <button 
          className="btn-add" 
          onClick={() => navigate(`/admin/reservas/addReserva`)}
        >
          Adicionar
        </button>

        {showModal && (
          <div className="modal-bg" onClick={fecharModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>Confirmar Exclusão</h2>
              <p>Deseja realmente excluir a reserva <b>{reservaSelecionada?.id}</b>?</p>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={fecharModal}>Cancelar</button>
                <button className="btn-confirm" onClick={confirmarExclusao}>Excluir</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminReservas;
