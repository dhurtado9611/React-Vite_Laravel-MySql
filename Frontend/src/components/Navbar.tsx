import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout(); // Cierra la sesión
      navigate('/'); // Redirige a la página de inicio
    } else {
      navigate('/login'); // Lleva al formulario de inicio de sesión
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/historial">Historial</Link>
        {isAuthenticated && <Link to="/reservas">Reservas</Link>}
      </div>
      <div className="navbar-auth">
        <button className="login-btn" onClick={handleAuth}>
          {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;