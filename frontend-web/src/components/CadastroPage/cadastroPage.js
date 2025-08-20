import "./CadastroPage.css";
import homeimg from "../../assets/Home.svg";
import logo from '../../assets/logo.svg';
import eye from '../../assets/eye.svg';
import eyeOff from '../../assets/eye-off.svg';
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
    senha: '',
    confirmSenha: ''
  });
  // Estado para mensagens de erro e sucesso
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Estado para mostrar requisitos da senha após submit
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  // Estado para exibir/ocultar senha
  const [showPassword, setShowPassword] = useState(false);

  // Regex para validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Regex para validação de telefone (apenas números)
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  // Requisitos de senha
  const passwordRequirements = [
    { label: 'Mínimo 8 caracteres', test: (s) => s.length >= 8 },
    { label: 'Ao menos uma letra maiúscula', test: (s) => /[A-Z]/.test(s) },
    { label: 'Ao menos uma letra minúscula', test: (s) => /[a-z]/.test(s) },
    { label: 'Ao menos um número', test: (s) => /[0-9]/.test(s) },
    { label: 'Ao menos um caractere especial', test: (s) => /[^A-Za-z0-9]/.test(s) }
  ];

  // Formata o telefone enquanto digita
  const formatPhone = (value) => {
    // Remove tudo que não é número
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    if (digits.length <= 11) return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
  };

  // Atualiza o estado do formulário ao digitar nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'telefone') {
      newValue = formatPhone(value);
    }
    setForm((prev) => ({
      ...prev,
      [name]: newValue
    }));
    setError('');
    setSuccess('');
    setShowPasswordRequirements(false);
  };

  // Envia o formulário para criar um novo cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowPasswordRequirements(false);
    // Validação dos campos
    if (!form.nome || !form.email || !form.telefone || !form.senha || !form.confirmSenha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (!emailRegex.test(form.email)) {
      setError('Email inválido.');
      return;
    }
    if (!phoneRegex.test(form.telefone)) {
      setError('Telefone inválido. Use o formato (XX) XXXXX-XXXX.');
      return;
    }
    if (form.senha !== form.confirmSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    const failedReqs = passwordRequirements.filter(r => !r.test(form.senha));
    if (failedReqs.length > 0) {
      setError('Senha inválida. Veja os requisitos abaixo.');
      setShowPasswordRequirements(true);
      return;
    }
    try {
      const response = await createCliente(form);
      // Se o backend retornar sucesso, mostra mensagem e redireciona
      if (response && response.success) {
        setSuccess('Cadastro realizado com sucesso!');
        setTimeout(() => navigate('/'), 1500);
      } else if (response && response.message) {
        // Se o backend retornar erro de email ou telefone duplicado
        if (response.message.includes('Email já cadastrado')) {
          setError('Este email já está cadastrado.');
          return;
        }
        if (response.message.includes('Telefone já cadastrado')) {
          setError('Este telefone já está cadastrado.');
          return;
        }
        setError(response.message);
        return;
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
      }
    } catch (err) {
      // Verifica se o erro é de email ou telefone duplicado
      if (err && err.response && err.response.data && err.response.data.message) {
        if (err.response.data.message.includes('Email já cadastrado')) {
          setError('Este email já está cadastrado.');
          return;
        }
        if (err.response.data.message.includes('Telefone já cadastrado')) {
          setError('Este telefone já está cadastrado.');
          return;
        }
        setError(err.response.data.message);
        return;
      }
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
              autoComplete: 'off',
              style: emailRegex.test(form.email) || !form.email ? {} : { borderColor: 'red' }
            }),
            React.createElement('label', null, 'Telefone'),
            React.createElement('input', {
              type: 'tel',
              name: 'telefone',
              inputMode: 'tel',
              placeholder: 'Digite seu telefone',
              value: form.telefone,
              onChange: handleChange,
              autoComplete: 'off',
              maxLength: 15,
              style: phoneRegex.test(form.telefone) || !form.telefone ? {} : { borderColor: 'red' }
            }),
            React.createElement('label', null, 'Senha'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', position: 'relative' } }, [
              React.createElement('input', {
                type: showPassword ? 'text' : 'password',
                name: 'senha',
                placeholder: 'Digite sua senha',
                value: form.senha,
                onChange: handleChange,
                autoComplete: 'off',
                style: { flex: 1, ...(passwordRequirements.every(r => r.test(form.senha)) || !form.senha ? {} : { borderColor: 'red' }) }
              }),
              React.createElement('img', {
                src: showPassword ? eyeOff : eye,
                alt: showPassword ? 'Ocultar senha' : 'Mostrar senha',
                onClick: () => setShowPassword((prev) => !prev),
                style: {
                  width: 24,
                  height: 24,
                  cursor: 'pointer',
                  marginLeft: 8,
                  position: 'absolute',
                  right: 0
                }
              })
            ]),
            React.createElement('label', null, 'Confirme a senha'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', position: 'relative' } }, [
              React.createElement('input', {
                type: showPassword ? 'text' : 'password',
                name: 'confirmSenha',
                placeholder: 'Confirme sua senha',
                value: form.confirmSenha,
                onChange: handleChange,
                autoComplete: 'off',
                style: { flex: 1, ...(form.confirmSenha && form.senha !== form.confirmSenha ? { borderColor: 'red' } : {}) }
              }),
              React.createElement('img', {
                src: showPassword ? eyeOff : eye,
                alt: showPassword ? 'Ocultar senha' : 'Mostrar senha',
                onClick: () => setShowPassword((prev) => !prev),
                style: {
                  width: 24,
                  height: 24,
                  cursor: 'pointer',
                  marginLeft: 8,
                  position: 'absolute',
                  right: 0
                }
              })
            ]),
            // Lista de requisitos da senha só após submit
            showPasswordRequirements && form.senha && passwordRequirements.some(r => !r.test(form.senha)) && React.createElement(
              'ul',
              { style: { color: 'red', margin: '8px 0', fontSize: '0.95em', paddingLeft: '20px' } },
              passwordRequirements.map((r, idx) =>
                React.createElement('li', { key: idx, style: { opacity: r.test(form.senha) ? 0.5 : 1 } }, r.label)
              )
            ),
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
