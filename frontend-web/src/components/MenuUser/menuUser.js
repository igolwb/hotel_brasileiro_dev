import React, { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import user from '../../assets/User.svg';
import './menuUser.css';
import useApiStore from '../../services/api.js';

function MinhasReservas() {
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const api = useApiStore();
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNome, setEditNome] = useState(authUser?.nome || '');
  const [editEmail, setEditEmail] = useState(authUser?.email || '');
  const [editTelefone, setEditTelefone] = useState(authUser?.telefone || '');
  const [editSenha, setEditSenha] = useState('');
  const [userId, setUserId] = useState(null);
  const [userNome, setUserNome] = useState('');

  useEffect(() => {
    // Buscar reservas
    fetch('http://localhost:3000/api/reservas/minhas-reservas', {
      headers: {
        Authorization: authHeader
      }
    })
      .then(res => res.json())
      .then(data => setReservas(data));

    // Buscar nome atualizado do usuário autenticado
    fetch('http://localhost:3000/api/clientes/me', {
      headers: {
        Authorization: authHeader
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.data && data.data.nome) {
          setUserNome(data.data.nome);
        } else if (authUser && authUser.nome) {
          setUserNome(authUser.nome);
        } else {
          setUserNome('Usuário');
        }
      })
      .catch(() => {
        if (authUser && authUser.nome) {
          setUserNome(authUser.nome);
        } else {
          setUserNome('Usuário');
        }
      });
  }, [authHeader, authUser]);

  function handleLogout() {
    signOut();
    window.location.href = '/';
  }

  function abrirModal(reserva) {
    setReservaSelecionada(reserva);
    setShowModal(true);
  }

  function fecharModal() {
    setShowModal(false);
    setReservaSelecionada(null);
  }

  async function confirmarExclusao() {
    if (reservaSelecionada) {
      await fetch(`http://localhost:3000/api/reservas/${reservaSelecionada.reserva_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: authHeader
        }
      });
      setReservas(reservas.filter(r => r.reserva_id !== reservaSelecionada.reserva_id));
      fecharModal();
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    if (!userId) {
      alert('ID do usuário não encontrado. Não é possível atualizar o perfil.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/clientes/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader
        },
        body: JSON.stringify({
          nome: editNome,
          email: editEmail,
          telefone: editTelefone,
          senha: editSenha
        })
      });
      if (response.ok) {
        setShowEditModal(false);
        window.location.reload();
      } else {
        alert('Erro ao atualizar perfil.');
      }
    } catch (err) {
      alert('Erro ao atualizar perfil.');
    }
  }

  // Buscar o id do usuário pelo email ao abrir o modal de edição
  async function handleOpenEditModal() {
    if (authUser?.email) {
      try {
        await api.fetchClientes(authHeader);
        const cliente = api.clientes.find(c => c.email === authUser.email);
        if (cliente && cliente.id) {
          setUserId(cliente.id);
          setEditNome(cliente.nome || '');
          setEditEmail(cliente.email || '');
          setEditTelefone(cliente.telefone || '');
          setEditSenha(''); // Não preenche senha por segurança
          setShowEditModal(true);
        } else {
          alert('Usuário não encontrado para edição.');
        }
      } catch (err) {
        alert('Erro ao buscar usuário para edição.');
      }
    } else {
      alert('Email do usuário não encontrado.');
    }
  }

  function formatarData(dataStr) {
    if (!dataStr) return '';
    const data = new Date(dataStr);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="minhas-reservas-container">
      <img src={user} className="minhas-reservas-avatar" alt="Usuário" />
      <h1 className="minhas-reservas-nome">
        Olá, {userNome}
      </h1>
      <h2 className="minhas-reservas-titulo">Suas reservas</h2>

      <div className="minhas-reservas-outer">
        <div className="minhas-reservas-list">
          {reservas.length > 0 ? (
            reservas.reduce((rows, reserva, idx) => {
              const rowIdx = Math.floor(idx / 5);
              if (!rows[rowIdx]) rows[rowIdx] = [];
              rows[rowIdx].push(reserva);
              return rows;
            }, []).map((row, rowIdx) => (
              <div className="minhas-reservas-row" key={rowIdx}>
                {row.map(reserva => (
                  <div key={reserva.reserva_id} className="minhas-reservas-card" onClick={() => abrirModal(reserva)} style={{ cursor: 'pointer' }}>
                    <img src={reserva.imagem_url} alt={reserva.quarto_nome} className="minhas-reservas-card-img" />
                    <div className="minhas-reservas-card-content">
                      <div className="minhas-reservas-card-title">{reserva.quarto_nome}</div>
                      <div className="minhas-reservas-info">
                        <div><b>Hóspedes:</b> {reserva.hospedes}</div>
                        <div><b>Início:</b> {formatarData(reserva.inicio)}</div>
                        <div><b>Fim:</b> {formatarData(reserva.fim)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="minhas-reservas-vazio">Você ainda não fez reservas.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-bg" onClick={fecharModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Cancelar Reserva</h2>
            <p>Deseja realmente cancelar a reserva do quarto <b>{reservaSelecionada?.quarto_nome}</b>?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={fecharModal}>Cancelar</button>
              <button className="btn-confirm" onClick={confirmarExclusao}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
      <div className="minhas-reservas-acoes">
      <button className="minhas-reservas-logout" onClick={handleLogout}>
        Sair
      </button>
      <button className="minhas-reservas-editar" onClick={handleOpenEditModal}>
        Editar Perfil
      </button>
      </div>

      {showEditModal && (
        <div className="modal-bg" onClick={() => setShowEditModal(false)}>
          <div className="modal-editar" onClick={e => e.stopPropagation()}>
            <h2>Editar Perfil</h2>
            <form className="minhas-reservas-edit-form" onSubmit={handleEditSubmit}>
              <div className="minhas-reservas-edit-group">
                <label>Nome</label>
                <input type="text" value={editNome} onChange={e => setEditNome(e.target.value)} required />
              </div>
              <div className="minhas-reservas-edit-group">
                <label>Email</label>
                <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} required />
              </div>
              <div className="minhas-reservas-edit-group">
                <label>Telefone</label>
                <input type="text" value={editTelefone} onChange={e => setEditTelefone(e.target.value)} required />
              </div>
              <div className="minhas-reservas-edit-group">
                <label>Senha</label>
                <input type="password" value={editSenha} onChange={e => setEditSenha(e.target.value)} required />
              </div>
              <div className="modal-editar-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancelar</button>
                <button type="submit" className="btn-confirm">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MinhasReservas;
