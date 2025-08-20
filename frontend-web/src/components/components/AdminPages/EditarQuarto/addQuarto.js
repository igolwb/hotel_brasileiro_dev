import React, { useState } from 'react';
import useApiStore from '../../../services/api.js';
import { useNavigate } from 'react-router-dom';
import useAuthAdmin from '../../../hooks/adminAuth.js';
import './formQuarto.css';

// Componente para adicionar um novo quarto
function AddQuarto() {
  // Recupera autenticação de admin e navegação
  const { authUser, authHeader } = useAuthAdmin();
  const navigate = useNavigate();
  // Função da store para criar quarto
  const { createQuarto, loading } = useApiStore();

  // Estado do formulário do quarto
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    preco: '',
    quantidade: '',
    imagem_url: ''
  });

  // Atualiza o estado do formulário ao digitar nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Envia o formulário para criar um novo quarto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuarto(form, authHeader);
      navigate('/admin/quartos');
    } catch (error) {
      alert('Erro ao criar o quarto. Tente novamente.');
    }
  };
  
  return (
    <div className="editar-quarto-container">
      <h1 className="editar-quarto-title">Adicionar Quarto</h1>
      <form className="editar-quarto-form" onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="editar-quarto-input"
            required
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="editar-quarto-input"
            required
          />
        </label>
        <label>
          Preço:
          <input
            type="number"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            className="editar-quarto-input"
            required
          />
        </label>
        <label>
          Quantidade:
          <input
            type="number"
            name="quantidade"
            value={form.quantidade}
            onChange={handleChange}
            className="editar-quarto-input"
            required
          />
        </label>
        <label>
          Foto:
          <input
            type="text"
            name="imagem_url"
            value={form.imagem_url}
            onChange={handleChange}
            className="editar-quarto-input"
            required
          />
        </label>
        <div className="editar-quarto-actions">
          <button
            type="button"
            className="editar-quarto-cancelar"
            onClick={() => navigate('/admin/quartos')}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="editar-quarto-salvar"
            disabled={loading}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddQuarto;