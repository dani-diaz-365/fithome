import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const notificaciones = [
  { id: 1, icono: '🏋️', texto: 'Tienes una rutina pendiente hoy.',         tiempo: 'Hace 5 min',  leida: false },
  { id: 2, icono: '👨‍🏫', texto: 'Tu entrenador Carlos te ha enviado un plan.', tiempo: 'Hace 1h',    leida: false },
  { id: 3, icono: '🛒', texto: 'Tu pedido ha sido enviado.',                tiempo: 'Hace 3h',    leida: true  },
  { id: 4, icono: '🥗', texto: 'Nuevo menú semanal disponible.',            tiempo: 'Ayer',       leida: true  },
  { id: 5, icono: '🔥', texto: '¡Llevas 5 días seguidos entrenando!',       tiempo: 'Ayer',       leida: true  },
];
const menuItems = [
  { icono: '🏠', label: 'Inicio', id: 'inicio', path: '/dashboard' },
  { icono: '🏋️', label: 'Rutinas', id: 'rutinas', path: '/rutinas' },
  { icono: '🥗', label: 'Dietas', id: 'dietas', path: '/dietas' },
  { icono: '👨‍🏫', label: 'Entrenadores', id: 'entrenadores', path: '/entrenadores' },
  { icono: '🛒', label: 'Tienda', id: 'tienda', path: '/tienda' },
  { icono: '📈', label: 'Progreso', id: 'progreso', path: '/progreso' },
];

const stats = [
  { icono: '🔥', valor: '18', label: 'Entrenamientos este mes' },
  { icono: '⏱️', valor: '12h 40m', label: 'Tiempo total entrenado' },
  { icono: '📅', valor: '10', label: 'Días seguidos activo' },
  { icono: '⚡', valor: '8.640', label: 'Calorías quemadas' },
];

const accesoRapido = [
  { icono: '🏋️', titulo: 'Rutina de hoy', desc: 'Tren superior básico · 30 min', link: '/rutinas', color: '#1a3a5c' },
  { icono: '🥗', titulo: 'Plan de dieta', desc: 'Ver menú del día', link: '/dietas', color: '#f47c20' },
  { icono: '👨‍🏫', titulo: 'Mi entrenador', desc: 'Carlos López · Online', link: '/entrenadores', color: '#27ae60' },
  { icono: '🛒', titulo: 'Tienda', desc: 'Novedades disponibles', link: '/tienda', color: '#8e44ad' },
];

function Dashboard() {
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [notifAbierto, setNotifAbierto] = useState(false);
  const [configAbierto, setConfigAbierto] = useState(false);
  const [notifs, setNotifs] = useState(notificaciones);
  const [oscuro, setOscuro] = useState(() => localStorage.getItem('oscuro') === 'true');
  const [editandoNombre, setEditandoNombre] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [mensajeNombre, setMensajeNombre] = useState('');
  const [cargando, setCargando] = useState(false);

  const notifRef = useRef(null);
  const configRef = useRef(null);

  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  const usuario = usuarioGuardado || { nombre: 'Usuario', plan: 'gratuito' };

  // Modo oscuro
  useEffect(() => {
    document.body.classList.toggle('oscuro', oscuro);
    localStorage.setItem('oscuro', oscuro);
  }, [oscuro]);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifAbierto(false);
      if (configRef.current && !configRef.current.contains(e.target)) setConfigAbierto(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const noLeidas = notifs.filter((n) => !n.leida).length;

  const marcarTodasLeidas = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, leida: true })));

  const handleGuardarNombre = async () => {
    if (!nuevoNombre.trim()) return;
    setCargando(true);
    try {
      const res = await fetch('http://localhost:8000/controllers/actualizar_nombre.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: usuario.id, nombre: nuevoNombre.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMensajeNombre(data.error || 'Error al actualizar.');
      } else {
        const actualizado = { ...usuarioGuardado, nombre: nuevoNombre.trim() };
        localStorage.setItem('usuario', JSON.stringify(actualizado));
        setMensajeNombre('✅ Nombre actualizado correctamente.');
        setEditandoNombre(false);
        window.location.reload();
      }
    } catch {
      setMensajeNombre('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar abierto={sidebarAbierto} setAbierto={setSidebarAbierto} />

      <main className="dashboard-main">

        {/* Topbar */}
        <div className="dashboard-topbar">
          <div>
            <h1 className="dashboard-saludo">¡Buenas, {usuario.nombre}! 👋</h1>
            <p className="dashboard-fecha">
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>

          <div className="topbar-acciones">

            {/* Notificaciones */}
            <div className="topbar-menu-wrap" ref={notifRef}>
              <button className="topbar-btn" onClick={() => { setNotifAbierto(!notifAbierto); setConfigAbierto(false); }}>
                🔔
                {noLeidas > 0 && <span className="topbar-badge">{noLeidas}</span>}
              </button>

              {notifAbierto && (
                <div className="dropdown notif-dropdown">
                  <div className="dropdown-header">
                    <span>Notificaciones</span>
                    {noLeidas > 0 && (
                      <button className="btn-marcar-leidas" onClick={marcarTodasLeidas}>
                        Marcar todas como leídas
                      </button>
                    )}
                  </div>
                  <div className="notif-lista">
                    {notifs.map((n) => (
                      <div
                        key={n.id}
                        className={`notif-item ${!n.leida ? 'no-leida' : ''}`}
                        onClick={() => setNotifs((prev) =>
                          prev.map((x) => x.id === n.id ? { ...x, leida: true } : x)
                        )}
                      >
                        <span className="notif-icono">{n.icono}</span>
                        <div className="notif-info">
                          <p className="notif-texto">{n.texto}</p>
                          <p className="notif-tiempo">{n.tiempo}</p>
                        </div>
                        {!n.leida && <span className="notif-punto" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Configuración */}
            <div className="topbar-menu-wrap" ref={configRef}>
              <button className="topbar-btn" onClick={() => { setConfigAbierto(!configAbierto); setNotifAbierto(false); }}>
                ⚙️
              </button>

              {configAbierto && (
                <div className="dropdown config-dropdown">
                  <div className="dropdown-header">
                    <span>Configuración</span>
                  </div>

                  {/* Modo oscuro */}
                  <div className="config-item">
                    <span>🌙 Modo oscuro</span>
                    <div
                      className={`toggle ${oscuro ? 'activo' : ''}`}
                      onClick={() => setOscuro(!oscuro)}
                    >
                      <div className="toggle-circulo" />
                    </div>
                  </div>

                  {/* Cambiar nombre */}
                  <div className="config-item config-nombre">
                    <span>✏️ Cambiar nombre</span>
                    <button
                      className="btn-editar-nombre"
                      onClick={() => { setEditandoNombre(!editandoNombre); setMensajeNombre(''); }}
                    >
                      {editandoNombre ? 'Cancelar' : 'Editar'}
                    </button>
                  </div>

                  {editandoNombre && (
                    <div className="config-editar-nombre">
                      <input
                        type="text"
                        placeholder={usuario.nombre}
                        value={nuevoNombre}
                        onChange={(e) => setNuevoNombre(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGuardarNombre()}
                      />
                      <button
                        className="btn-guardar-nombre"
                        onClick={handleGuardarNombre}
                        disabled={cargando}
                      >
                        {cargando ? '...' : 'Guardar'}
                      </button>
                    </div>
                  )}

                  {mensajeNombre && (
                    <p className="config-mensaje">{mensajeNombre}</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Stats, acceso rápido y rutina del día — igual que antes */}
        <section className="stats-grid">
          {[
            { icono: '🔥', valor: '12',      label: 'Entrenamientos este mes' },
            { icono: '⏱️', valor: '8h 30m',  label: 'Tiempo total entrenado'  },
            { icono: '📅', valor: '5',        label: 'Días seguidos activo'    },
            { icono: '⚡', valor: '3.200',    label: 'Calorías quemadas'       },
          ].map((s, i) => (
            <div className="stat-card" key={i}>
              <span className="stat-icono">{s.icono}</span>
              <div>
                <p className="stat-valor">{s.valor}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="acceso-rapido">
          <h2>Acceso rápido</h2>
          <div className="acceso-grid">
            {[
              { icono: '🏋️', titulo: 'Rutina de hoy',    desc: 'Tren superior · 45 min',    link: '/rutinas',      color: '#1a3a5c' },
              { icono: '🥗', titulo: 'Plan de dieta',    desc: 'Ver menú del día',           link: '/dietas',       color: '#f47c20' },
              { icono: '👨‍🏫', titulo: 'Mi entrenador',  desc: 'Carlos López · Online',      link: '/entrenadores', color: '#27ae60' },
              { icono: '🛒', titulo: 'Tienda',            desc: 'Novedades disponibles',      link: '/tienda',       color: '#8e44ad' },
            ].map((a, i) => (
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