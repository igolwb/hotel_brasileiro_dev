import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

// Hooks do React Auth Kit
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // React Auth Kit hooks
  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();

  // Função para rolagem/navegação híbrida
  function handleScrollOrNavigate(id) {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      scrollToSection(id);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }

  // Função de rolagem suave
  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Alternar visibilidade do menu mobile
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img className="logo-img" src={logo} alt="Logo" />
          <div className="logo-text">
            <div>Hotel</div>
            <div>Brasileiro</div>
          </div>
        </div>

        {/* Menu Hamburguer */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Links de navegação */}
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <button
            className="hint1"
            onClick={() => {
              setIsMenuOpen(false);
              navigate('/');
            }}
          >
            Inicio
          </button>

          <button
            className="hint1"
            onClick={() => handleScrollOrNavigate('quartos')}
          >
            Ir para Quartos
          </button>
          <button
            className="hint1"
            onClick={() => handleScrollOrNavigate('experiencias')}
          >
            Ir para Experiências
          </button>

          {/* Botão Clientes para admin */}
          {isAuthenticated && authUser && authUser.role === 'admin' && (
            <button
              className="hint1"
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/admin/clientes');
              }}
            >
              Admin Dashboard
            </button>
          )}

          {/* Autenticação */}
          {isAuthenticated ? (
            <div className="user-info">
              <button
                className="user-menu-button"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/minhas-reservas');
                }}
              >
                {authUser ? 'Menu do Usuário' : 'Usuário'}
              </button>
            </div>
          ) : (
            <button
              className="login-button"
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/login');
              }}
            >
              Faça seu login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
