import AuthProvider from 'react-auth-kit'; // default import
import createStore from 'react-auth-kit/createStore';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './Routes/index.js';
import Header from './components/Header/header.js';
import Footer from './components/Footer/footer.js';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/cadastro' 
  || location.pathname === '/admin/clientes' || location.pathname === '/admin/quartos' 
  || location.pathname.includes('/admin/quartos/')  || location.pathname.includes('/admin/reservas') 
  || location.pathname.includes('/admin/reservas/');


  const hideFooter = location.pathname === '/login' || location.pathname === '/cadastro' 
  || location.pathname === '/admin/clientes' || location.pathname === '/admin/quartos' 
  || location.pathname.includes('/admin/quartos/') || location.pathname.includes('/admin/reservas') 
  || location.pathname.includes('/admin/reservas/');
  

  return (
    <>
      {!hideHeader && <Header />}
      <AppRoutes />
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider store={store}>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;