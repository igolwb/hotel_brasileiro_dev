import React, { useEffect, useState } from 'react';
import useApiStore from '../../../services/api.js';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../HeaderAdmin/adminHeader.js';
import useAuthAdmin from '../../../hooks/adminAuth.js';
import './quartoPage.css';
import tabler_edit from '../../../assets/tabler_edit.svg';
import delete_btn from '../../../assets/delete_btn.svg';

const QUARTOS_PER_PAGE = 10;

function Quartos() {
  // Hook customizado para autenticação de admin
  const { authUser, authHeader } = useAuthAdmin();

  // Hooks e métodos da store de API para quartos
  const { quartos, loading, fetchQuartos, deleteQuarto } = useApiStore();

  // Estado para controlar a página atual da paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para exibir o modal de confirmação de exclusão
  const [showModal, setShowModal] = useState(false);

  // Estado para armazenar o quarto selecionado para exclusão
  const [quartoSelecionado, setQuartoSelecionado] = useState(null);

  const navigate = useNavigate();

  // Busca os quartos ao carregar o componente ou quando o admin muda
  useEffect(() => {
    if (authUser) {
      fetchQuartos(authHeader);
    }
  }, [fetchQuartos, authUser, authHeader]);

  // Calcula o índice do primeiro e último quarto da página atual
  const indexOfLastQuarto = currentPage * QUARTOS_PER_PAGE;
  const indexOfFirstQuarto = indexOfLastQuarto - QUARTOS_PER_PAGE;

  // Lista de quartos da página atual
  const currentQuartos = quartos.slice(indexOfFirstQuarto, indexOfLastQuarto);

  // Calcula o total de páginas para a paginação
  const totalPages = Math.ceil(quartos.length / QUARTOS_PER_PAGE);

  // Abre o modal de confirmação de exclusão para o quarto selecionado
  const abrirModal = (quarto) => {
    setQuartoSelecionado(quarto);
    setShowModal(true);
  };

  // Fecha o modal de confirmação
  const fecharModal = () => {
    setShowModal(false);
    setQuartoSelecionado(null);
  };

  // Confirma a exclusão do quarto selecionado
  const confirmarExclusao = () => {
    if (quartoSelecionado) {
      deleteQuarto(quartoSelecionado.id, authHeader);
      fecharModal();
    }
  };

  // Calcula quantas linhas vazias preencher para manter a tabela alinhada
  const linhasVazias = Math.max(0, QUARTOS_PER_PAGE - currentQuartos.length);

  return (
    <>
      <AdminHeader />
      <div className="quartos-container">
        <h1 className="quartos-title">Quartos</h1>
        <table className="quartos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center' }}>Carregando...</td>
              </tr>
            ) : (
              <>
                {currentQuartos.map((quarto) => (
                  <tr key={quarto.id}>
                    <td>{quarto.id}</td>
                    <td>
  {quarto.imagem_url ? (
    <>
      {console.log('Imagem URL:', quarto.imagem_url)}
      <img src={quarto.imagem_url} alt="Imagem do quarto" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
    </>
  ) : (
    'Sem imagem'
  )}
</td>
                    <td>{quarto.nome}</td>
                    <td>{quarto.descricao}</td>
                    <td>{quarto.preco}</td>
                    <td>{quarto.quantidade}</td>
                    <td>
                      <button 
                      className="btn-trash" onClick={() => abrirModal(quarto)}>
                         <img src={delete_btn} alt="Excluir" style={{ width: 28, height: 28 }}/>
                      </button>
                      <button 
                      className="btn-image" onClick={() => navigate(`/admin/quartos/${quarto.id}`)}>
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
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="pagination">
          <button className="pagination-btn" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}>Anterior
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
          <button className="pagination-btn" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>Próxima
          </button>
        </div>

        {/* Botão Adicionar */}
        <button className="btn-add" onClick={() => navigate(`/admin/quartos/addQuarto`)}>Adicionar
        </button>

        {/* Modal de confirmação */}
        {showModal && (
          <div className="modal-bg" onClick={fecharModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2>Confirmar Exclusão</h2>
              <p>Deseja realmente excluir o quarto <b>{quartoSelecionado?.nome}</b>?</p>
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

export default Quartos;
