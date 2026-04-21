import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Rutinas.css';

const rutinas = [
  {
    id: 1,
    titulo: 'Tren superior básico',
    nivel: 'Principiante',
    grupo: 'Pecho',
    duracion: '30 min',
    ejercicios: [
      { nombre: 'Push-ups', series: '3', reps: '10' },
      { nombre: 'Fondos entre sillas', series: '3', reps: '8' },
      { nombre: 'Plancha', series: '3', reps: '30s' },
    ],
  },
  {
    id: 2,
    titulo: 'Piernas sin equipamiento',
    nivel: 'Principiante',
    grupo: 'Piernas',
    duracion: '35 min',
    ejercicios: [
      { nombre: 'Sentadillas', series: '4', reps: '15' },
      { nombre: 'Zancadas', series: '3', reps: '12' },
      { nombre: 'Puente de glúteos', series: '3', reps: '15' },
      { nombre: 'Saltos de tijera', series: '3', reps: '20' },
    ],
  },
  {
    id: 3,
    titulo: 'Core y abdominales',
    nivel: 'Intermedio',
    grupo: 'Abdomen',
    duracion: '25 min',
    ejercicios: [
      { nombre: 'Crunch abdominal', series: '4', reps: '20' },
      { nombre: 'Plancha lateral', series: '3', reps: '30s' },
      { nombre: 'Mountain climbers', series: '3', reps: '30s' },
      { nombre: 'Elevación de piernas', series: '3', reps: '15' },
    ],
  },
  {
    id: 4,
    titulo: 'Espalda y bíceps',
    nivel: 'Intermedio',
    grupo: 'Espalda',
    duracion: '40 min',
    ejercicios: [
      { nombre: 'Remo con mochila', series: '4', reps: '12' },
      { nombre: 'Superman', series: '3', reps: '15' },
      { nombre: 'Curl de bíceps con botella', series: '3', reps: '12' },
      { nombre: 'Pull-over en suelo', series: '3', reps: '12' },
    ],
  },
  {
    id: 5,
    titulo: 'Full body intenso',
    nivel: 'Avanzado',
    grupo: 'Full Body',
    duracion: '50 min',
    ejercicios: [
      { nombre: 'Burpees', series: '4', reps: '15' },
      { nombre: 'Push-ups diamante', series: '4', reps: '12' },
      { nombre: 'Sentadilla búlgara', series: '3', reps: '12' },
      { nombre: 'Plancha con toque de hombro', series: '3', reps: '20' },
      { nombre: 'Saltos al cajón', series: '3', reps: '10' },
    ],
  },
  {
    id: 6,
    titulo: 'Hombros y tríceps',
    nivel: 'Avanzado',
    grupo: 'Hombros',
    duracion: '45 min',
    ejercicios: [
      { nombre: 'Press militar con botellas', series: '4', reps: '12' },
      { nombre: 'Elevaciones laterales', series: '3', reps: '15' },
      { nombre: 'Fondos de tríceps', series: '4', reps: '15' },
      { nombre: 'Pino asistido', series: '3', reps: '30s' },
    ],
  },
];

const niveles = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
const grupos  = ['Todos', 'Pecho', 'Piernas', 'Abdomen', 'Espalda', 'Hombros', 'Full Body'];
const colorNivel = { Principiante: '#27ae60', Intermedio: '#f47c20', Avanzado: '#c0392b' };

function Modal({ rutina, completados, onToggle, onCerrar }) {
  const total = rutina.ejercicios.length;
  const hechos = rutina.ejercicios.filter((_, i) => completados[`${rutina.id}-${i}`]).length;
  const porcentaje = Math.round((hechos / total) * 100);

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-caja" onClick={(e) => e.stopPropagation()}>

        <button className="modal-cerrar" onClick={onCerrar}>✕</button>

        <div className="modal-cabecera">
          <h2>{rutina.titulo}</h2>
          <div className="rutina-meta">
            <span className="badge-nivel" style={{ background: colorNivel[rutina.nivel] }}>
              {rutina.nivel}
            </span>
            <span className="rutina-grupo">💪 {rutina.grupo}</span>
            <span className="rutina-duracion">⏱️ {rutina.duracion}</span>
          </div>
        </div>

        <div className="modal-progreso">
          <div className="progreso-barra">
            <div className="progreso-relleno" style={{ width: `${porcentaje}%` }} />
          </div>
          <span className="progreso-texto">{hechos}/{total} ejercicios completados</span>
        </div>

        <ul className="ejercicios-lista">
          {rutina.ejercicios.map((ej, i) => {
            const hecho = completados[`${rutina.id}-${i}`];
            return (
              <li
                key={i}
                className={`ejercicio-item ${hecho ? 'hecho' : ''}`}
                onClick={() => onToggle(rutina.id, i)}
              >
                <span className="ejercicio-check">{hecho ? '✅' : '⬜'}</span>
                <span className="ejercicio-nombre">{ej.nombre}</span>
                <span className="ejercicio-detalle">{ej.series} × {ej.reps}</span>
              </li>
            );
          })}
        </ul>

        {porcentaje === 100 && (
          <div className="modal-completado">
            🎉 ¡Rutina completada! ¡Buen trabajo!
          </div>
        )}

      </div>
    </div>
  );
}

function Rutinas() {
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [nivelActivo, setNivelActivo]       = useState('Todos');
  const [grupoActivo, setGrupoActivo]       = useState('Todos');
  const [rutinaModal, setRutinaModal]       = useState(null);
  const [completados, setCompletados]       = useState({});

  const rutinasFiltradas = rutinas.filter((r) => {
    const okNivel = nivelActivo === 'Todos' || r.nivel === nivelActivo;
    const okGrupo = grupoActivo === 'Todos' || r.grupo === grupoActivo;
    return okNivel && okGrupo;
  });

  const toggleEjercicio = (rutinaId, index) => {
    const key = `${rutinaId}-${index}`;
    setCompletados((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ejerciciosCompletados = (rutina) =>
    rutina.ejercicios.filter((_, i) => completados[`${rutina.id}-${i}`]).length;

  return (
    <div className="rutinas-layout">
      <Sidebar abierto={sidebarAbierto} setAbierto={setSidebarAbierto} />

      <main className="rutinas-main">
        <h1 className="rutinas-titulo">Rutinas de entrenamiento</h1>
        <p className="rutinas-subtitulo">Filtra por nivel o grupo muscular y empieza cuando quieras.</p>

        {/* Filtros */}
        <div className="filtros">
          <div className="filtro-grupo">
            <span className="filtro-etiqueta">Nivel:</span>
            {niveles.map((n) => (
              <button
                key={n}
                className={`filtro-btn ${nivelActivo === n ? 'activo' : ''}`}
                onClick={() => setNivelActivo(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="filtro-grupo">
            <span className="filtro-etiqueta">Músculo:</span>
            {grupos.map((g) => (
              <button
                key={g}
                className={`filtro-btn ${grupoActivo === g ? 'activo' : ''}`}
                onClick={() => setGrupoActivo(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de rutinas */}
        <div className="rutinas-grid">
          {rutinasFiltradas.length === 0 && (
            <p className="sin-resultados">No hay rutinas con estos filtros.</p>
          )}
          {rutinasFiltradas.map((rutina) => {
            const hechos     = ejerciciosCompletados(rutina);
            const total      = rutina.ejercicios.length;
            const porcentaje = Math.round((hechos / total) * 100);

            return (
              <div className="rutina-card" key={rutina.id}>
                <div className="rutina-cabecera">
                  <h3 className="rutina-nombre">{rutina.titulo}</h3>
                  <div className="rutina-meta">
                    <span
                      className="badge-nivel"
                      style={{ background: colorNivel[rutina.nivel] }}
                    >
                      {rutina.nivel}
                    </span>
                    <span className="rutina-grupo">💪 {rutina.grupo}</span>
                    <span className="rutina-duracion">⏱️ {rutina.duracion}</span>
                  </div>
                </div>

                <div className="progreso-barra-wrap">
                  <div className="progreso-barra">
                    <div className="progreso-relleno" style={{ width: `${porcentaje}%` }} />
                  </div>
                  <span className="progreso-texto">{hechos}/{total}</span>
                </div>

                <button
                  className="btn-ver-rutina"
                  onClick={() => setRutinaModal(rutina)}
                >
                  Ver rutina →
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal */}
      {rutinaModal && (
        <Modal
          rutina={rutinaModal}
          completados={completados}
          onToggle={toggleEjercicio}
          onCerrar={() => setRutinaModal(null)}
        />
      )}
    </div>
  );
}

export default Rutinas;