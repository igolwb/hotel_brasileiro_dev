import "./CadastroPage.css";
import homeimg from "../../assets/Home.svg";
import logo from '../../assets/logo.svg';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useApiStore from '../../services/api.js';

// Componente de página de cadastro de novo cliente
function CadastroPage() {
  // Hook de navegação do React Router
  const navigate = useNavigate();
  // Função da store para criar cliente e estado de loading
  const { createCliente, loading } = useApiStore();
  // Estado para detectar se é mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Atualiza o estado isMobile ao redimensionar a tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Estado do formulário de cadastro
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: ''
  });
  // Estado para mensagens de erro e sucesso
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Atualiza o estado do formulário ao digitar nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  // Envia o formulário para criar um novo cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.nome || !form.email || !form.telefone || !form.senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    try {
      await createCliente(form);
      setSuccess('Cadastro realizado com sucesso!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  return React.createElement(
    'div',
    { className: 'container' },
    [
      React.createElement(
        'div',
        { className: 'left-panel' },
        [
          React.createElement(
            'div',
            { className: 'logo-title-row' },
            [
              React.createElement(
                'div',
                { className: 'logo' },
                React.createElement('img', { className: 'logo-img-login', src: logo, alt: 'Logo' })
              ),
              React.createElement(
                'h1',
                null,
                ['Hotel ', React.createElement('br'), ' Brasileiro']
              )
            ]
          ),
          React.createElement('h2', null, 'Sua próxima jornada começa aqui'),
          React.createElement(
            'p',
            null,
            isMobile ? 'Preencha seus dados para começar' : 'Só precisamos de duas coisas: seu email e sua vontade de relaxar.'
          )
        ]
      ),
      React.createElement(
        'div',
        { className: 'right-panel' },
        React.createElement(
          'form',
          { className: 'login-form', onSubmit: handleSubmit },
          [
            React.createElement('h2', null, 'Cadastre-se'),
            React.createElement('label', null, 'Nome'),
            React.createElement('input', {
              type: 'text',
              name: 'nome',
              placeholder: 'Digite seu nome',
              value: form.nome,
              onChange: handleChange,
              autoComplete: 'off'
            }),
            React.createElement('label', null, 'Email'),
            React.createElement('input', {
              type: 'email',
              name: 'email',
              placeholder: 'Digite seu email',
              value: form.email,
              onChange: handleChange,
              autoComplete: 'off'
            }),
            React.createElement('label', null, 'Telefone'),
            React.createElement('input', {
              type: 'tel',
              name: 'telefone',
              inputMode: 'tel',
              placeholder: 'Digite seu telefone',
              value: form.telefone,
              onChange: handleChange,
              autoComplete: 'off'
            }),
            React.createElement('label', null, 'Senha'),
            React.createElement('input', {
              type: 'password',
              name: 'senha',
              placeholder: 'Digite sua senha',
              value: form.senha,
              onChange: handleChange,
              autoComplete: 'off'
            }),
            React.createElement(
              Link,
              { className: 'hint', to: '/login', onClick: () => navigate('/login') },
              'Já tem uma conta? Faça o login'
            ),
            error && React.createElement('div', { style: { color: 'red', margin: '8px 0', textAlign: 'center' } }, error),
            success && React.createElement('div', { style: { color: 'green', margin: '8px 0', textAlign: 'center' } }, success),
            React.createElement(
              'button',
              { type: 'submit', disabled: loading },
              loading ? 'Cadastrando...' : 'Desbloquear estadia'
            ),
            React.createElement(
              'div',
              { className: 'back-home', onClick: () => navigate('/'), style: { cursor: 'pointer' } },
              [
                React.createElement('p', null, 'Volte para o início'),
                React.createElement('img', {
                  className: 'home-icon',
                  src: homeimg,
                  alt: 'Home'
                })
              ]
            )
          ]
        )
      )
    ]
  );
}

export default CadastroPage;
