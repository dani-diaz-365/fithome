import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const menuItems = [
  { icono: '🏠', label: 'Inicio', id: 'inicio' },
  { icono: '🏋️', label: 'Rutinas', id: 'rutinas' },
  { icono: '🥗', label: 'Dietas', id: 'dietas' },
  { icono: '👨‍🏫', label: 'Entrenadores', id: 'entrenadores' },
  { icono: '🛒', label: 'Tienda', id: 'tienda' },
  { icono: '📈', label: 'Progreso', id: 'progreso' },
];

const stats = [
  { icono: '🔥', valor: '12', label: 'Entrenamientos este mes' },
  { icono: '⏱️', valor: '8h 30m', label: 'Tiempo total entrenado' },
  { icono: '📅', valor: '5', label: 'Días seguidos activo' },
  { icono: '⚡', valor: '3.200', label: 'Calorías quemadas' },
];

const accesoRapido = [
  { icono: '🏋️', titulo: 'Rutina de hoy', desc: 'Tren superior · 45 min', link: '/rutinas', color: '#1a3a5c' },
  { icono: '🥗', titulo: 'Plan de dieta', desc: 'Ver menú del día', link: '/dietas', color: '#f47c20' },
  { icono: '👨‍🏫', titulo: 'Mi entrenador', desc: 'Carlos López · Online', link: '/entrenadores', color: '#27ae60' },
  { icono: '🛒', titulo: 'Tienda', desc: 'Novedades disponibles', link: '/tienda', color: '#8e44ad' },
];

function Dashboard() {
  const [activo, setActivo] = useState('inicio');
  const [sidebarAbierto, setSidebarAbierto] = useState(true);

  // Usuario simulado (luego vendrá del backend)
  const usuario = { nombre: 'Daniel', plan: 'Premium' };

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarAbierto ? 'abierto' : 'cerrado'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="fit">FIT</span><span className="home">HOME</span>
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarAbierto(!sidebarAbierto)}>
            {sidebarAbierto ? '◀' : '▶'}
          </button>
        </div>

        <div className="sidebar-perfil">
          <div className="avatar">
            {usuario.nombre.charAt(0)}
          </div>
          {sidebarAbierto && (
            <div>
              <p className="perfil-nombre">{usuario.nombre}</p>
              <span className="perfil-plan">{usuario.plan}</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activo === item.id ? 'activo' : ''}`}
              onClick={() => setActivo(item.id)}
            >
              <span className="sidebar-icono">{item.icono}</span>
              {sidebarAbierto && <span className="sidebar-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-item cerrar-sesion">
            <span className="sidebar-icono">🚪</span>
            {sidebarAbierto && <span className="sidebar-label">Cerrar sesión</span>}
          </Link>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="dashboard-main">

        {/* Topbar */}
        <div className="dashboard-topbar">
          <div>
            <h1 className="dashboard-saludo">¡Buenas, {usuario.nombre}! 👋</h1>
            <p className="dashboard-fecha">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="topbar-acciones">
            <button className="topbar-btn">🔔</button>
            <button className="topbar-btn">⚙️</button>
          </div>
        </div>

        {/* Stats */}
        <section className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <span className="stat-icono">{s.icono}</span>
              <div>
                <p className="stat-valor">{s.valor}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Acceso rápido */}
        <section className="acceso-rapido">
          <h2>Acceso rápido</h2>
          <div className="acceso-grid">
            {accesoRapido.map((a, i) => (
              <Link to={a.link} className="acceso-card" key={i} style={{ '--color-card': a.color }}>
                <span className="acceso-icono">{a.icono}</span>
                <div>
                  <p className="acceso-titulo">{a.titulo}</p>
                  <p className="acceso-desc">{a.desc}</p>
                </div>
                <span className="acceso-flecha">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Rutina del día */}
        <section className="rutina-hoy">
          <h2>Rutina de hoy</h2>
          <div className="rutina-card">
            <div className="rutina-info">
              <h3>💪 Tren superior</h3>
              <p>Nivel: Intermedio · Duración: 45 min · Sin equipamiento</p>
            </div>
            <div className="rutina-ejercicios">
              {['Push-ups · 4x12', 'Fondos de triceps · 3x15', 'Remo con mochila · 3x10', 'Plancha · 3x45s'].map((ej, i) => (
                <div className="ejercicio-item" key={i}>
                  <span className="ejercicio-num">{i + 1}</span>
                  <span>{ej}</span>
                </div>
              ))}
            </div>
            <button className="btn-empezar">Empezar entrenamiento →</button>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;