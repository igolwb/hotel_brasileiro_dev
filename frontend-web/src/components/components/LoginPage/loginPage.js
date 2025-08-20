import "./LoginPage.css";
import homeimg from "../../assets/Home.svg";
import logo from '../../assets/logo.svg';
import eye from '../../assets/eye.svg';
import eyeOff from '../../assets/eye-off.svg';
import { useNavigate, Link } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import axios from 'axios';
import { useState } from 'react';

// Componente de página de login do sistema
function LoginPage() {
  // Hook de navegação do React Router
  const navigate = useNavigate();
  // Hook de autenticação do react-auth-kit
  const signIn = useSignIn();
  // Estado para email, senha e mensagem de erro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // Função para tratar o envio do formulário de login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, senha });
      if (response.data.success) {
        const ok = signIn({
          auth: {
            token: response.data.token,
            type: 'Bearer'
          },
          userState: { email, role: response.data.role }
        });
        if (ok) {
          if (response.data.role === 'admin') {
            navigate('/admin/clientes');
          } else {
            navigate('/');
          }
        } else {
          setErrorMsg('Erro ao salvar autenticação. Tente novamente.');
        }
      } else {
        setErrorMsg('Credenciais inválidas.');
      }
    } catch (error) {
      setErrorMsg('Erro ao realizar login. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="logo-title-row">
          <div className="logo">
            <img className='logo-img-login' src={logo} alt="Logo" />
          </div>
          <h1>
            Hotel <br /> Brasileiro
          </h1>
        </div>
        <h2>Sua próxima jornada começa aqui</h2>
        <p>
          Só precisamos de duas coisas: <br />
          seu email e sua vontade de relaxar.
        </p>
      </div>
      <div className="right-panel">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Faça seu login</h2>
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
         <label>Senha</label>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Digite sua senha"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      required
      style={{ flex: 1, paddingRight: 28 }}
    />
    <img
      src={showPassword ? eyeOff : eye}
      alt={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
      onClick={() => setShowPassword((prev) => !prev)}
      className="eye-icon"
    />
  </div>
          <Link className="hint" to="/cadastro" onClick={() => navigate('/cadastro')}>
            Crie sua conta e desvende o hotel
          </Link>
          {errorMsg && (
            <div style={{ color: 'red', fontSize: '0.95rem', marginBottom: '8px', textAlign: 'center' }}>{errorMsg}</div>
          )}
          <button type="submit">Desbloquear estadia</button>
          <div className="back-home">
            <p>Volte para o início</p>
            <img className="home-icon" src={homeimg} alt="Home" onClick={() => navigate('/')} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
