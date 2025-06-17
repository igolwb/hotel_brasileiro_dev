import './Footer.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Parte esquerda */}
        <div className="footer-contact">
          <h2>Fale Conosco</h2>
          <p>📍 R. Bento Branco de Andrade Filho, 379 - Santo Amaro</p>
          <p>✉️ contato.hotel.brasileiro@gmail.com</p>
          <Link to="/" className="footer-button">Voltar para o início</Link>
        </div>

        {/* Parte direita */}
        <div className="footer-logo">
          <img src={logo} alt="Logo" className="footer-logo-img" />
          <div className="footer-logo-text">
            <div>Hotel</div>
            <div>Brasileiro</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;