import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { icono: '🏠', label: 'Inicio',        path: '/dashboard' },
  { icono: '🏋️', label: 'Rutinas',       path: '/rutinas' },
  { icono: '🥗', label: 'Dietas',        path: '/dietas' },
  { icono: '👨‍🏫', label: 'Entrenadores', path: '/entrenadores' },
  { icono: '📈', label: 'Progreso',      path: '/progreso' },
  { icono: '🛒', label: 'Tienda',        path: '/tienda' },
];

function Sidebar({ abierto, setAbierto }) {
  const location = useLocation();
  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  const usuario = usuarioGuardado || { nombre: 'Usuario', plan: 'gratuito' };

  return (
    <aside className={`sidebar ${abierto ? 'abierto' : 'cerrado'}`}>

      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="fit">FIT</span><span className="home">HOME</span>
        </div>
        <button className="sidebar-toggle" onClick={() => setAbierto(!abierto)}>
          {abierto ? '◀' : '▶'}
        </button>
      </div>

      <div className="sidebar-perfil">
        <div className="avatar">{usuario.nombre.charAt(0)}</div>
        {abierto && (
          <div>
            <p className="perfil-nombre">{usuario.nombre}</p>
            <span className="perfil-plan">{usuario.plan}</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'activo' : ''}`}
          >
            <span className="sidebar-icono">{item.icono}</span>
            {abierto && <span className="sidebar-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link
          to="/"
          className="sidebar-item cerrar-sesion"
          onClick={() => localStorage.removeItem('usuario')}
        >
          <span className="sidebar-icono">🚪</span>
          {abierto && <span className="sidebar-label">Cerrar sesión</span>}
        </Link>
      </div>

    </aside>
  );
}

export default Sidebar;