import logo from '../../../assets/logo.svg';
import './adminheader.css';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="headera">
      <div className="header-containera">
        <div className="logoa">
          <img className="logo-imga" src={logo} alt="Logo" />
          <div className="logo-texta">
            <div>Hotel</div>
            <div>Brasileiro</div>
          </div>
        </div>
        <nav className="nav-linksa">
          <span className="nav-linka" onClick={() => navigate('/')}>Início</span>
          <span className="nav-linka" onClick={() => navigate('/admin/clientes')}>Clientes</span>
          <span className="nav-linka" onClick={() => navigate('/admin/quartos')}>Quartos</span>
          <span className="nav-linka" onClick={() => navigate('/admin/reservas')}>Reservas</span>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;