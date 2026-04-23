import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import Sidebar from '../components/Sidebar';
import './Progreso.css';
import { useEntrenamientos } from '../context/EntrenamientosContext';

const datosSemana = [
  { dia: 'Lun', peso: 78.2, calorias: 420, entrenamientos: 1 },
  { dia: 'Mar', peso: 78.0, calorias: 380, entrenamientos: 1 },
  { dia: 'Mié', peso: 77.8, calorias: 0,   entrenamientos: 0 },
  { dia: 'Jue', peso: 77.9, calorias: 510, entrenamientos: 1 },
  { dia: 'Vie', peso: 77.5, calorias: 460, entrenamientos: 1 },
  { dia: 'Sáb', peso: 77.3, calorias: 390, entrenamientos: 1 },
  { dia: 'Dom', peso: 77.1, calorias: 0,   entrenamientos: 0 },
];

const datosMes = [
  { semana: 'Sem 1', peso: 78.5, calorias: 1820, entrenamientos: 4 },
  { semana: 'Sem 2', peso: 78.1, calorias: 2100, entrenamientos: 5 },
  { semana: 'Sem 3', peso: 77.6, calorias: 1950, entrenamientos: 4 },
  { semana: 'Sem 4', peso: 77.1, calorias: 2200, entrenamientos: 5 },
];

const historial = [
  { id: 1, fecha: 'Hoy',        rutina: 'Tren superior',         duracion: '45 min', calorias: 420, nivel: 'Intermedio',   completado: true  },
  { id: 2, fecha: 'Ayer',       rutina: 'Piernas sin equipo',    duracion: '35 min', calorias: 380, nivel: 'Principiante', completado: true  },
  { id: 3, fecha: 'Hace 2 días',rutina: 'Core y abdominales',    duracion: '25 min', calorias: 290, nivel: 'Intermedio',   completado: true  },
  { id: 4, fecha: 'Hace 3 días',rutina: 'Full body intenso',     duracion: '50 min', calorias: 510, nivel: 'Avanzado',     completado: true  },
  { id: 5, fecha: 'Hace 4 días',rutina: 'Hombros y tríceps',     duracion: '40 min', calorias: 360, nivel: 'Avanzado',     completado: false },
  { id: 6, fecha: 'Hace 5 días',rutina: 'Espalda y bíceps',      duracion: '40 min', calorias: 390, nivel: 'Intermedio',   completado: true  },
  { id: 7, fecha: 'Hace 6 días',rutina: 'Tren superior básico',  duracion: '30 min', calorias: 310, nivel: 'Principiante', completado: true  },
];

const colorNivel = {
  Principiante: '#27ae60',
  Intermedio:   '#f47c20',
  Avanzado:     '#c0392b',
};

const resumen = [
  { icono: '🏋️', valor: '18',      label: 'Entrenamientos este mes' },
  { icono: '🔥', valor: '8.640',   label: 'Calorías quemadas'       },
  { icono: '⏱️', valor: '12h 40m', label: 'Tiempo total'            },
  { icono: '📉', valor: '−1.4 kg', label: 'Peso perdido este mes'   },
];

function Progreso() {
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [periodo, setPeriodo]               = useState('semana');
  const [graficaActiva, setGraficaActiva]   = useState('peso');
  const { historial } = useEntrenamientos();

  const datos = periodo === 'semana' ? datosSemana : datosMes;
  const ejeX  = periodo === 'semana' ? 'dia' : 'semana';

  const graficas = [
    { key: 'peso',          label: 'Peso (kg)',       color: '#1a3a5c' },
    { key: 'calorias',      label: 'Calorías',        color: '#f47c20' },
    { key: 'entrenamientos',label: 'Entrenamientos',  color: '#27ae60' },
  ];

  return (
    <div className="progreso-layout">
      <Sidebar abierto={sidebarAbierto} setAbierto={setSidebarAbierto} />

      <main className="progreso-main">
        <h1 className="progreso-titulo">Mi progreso</h1>
        <p className="progreso-subtitulo">Visualiza tu evolución y consulta tu historial de entrenamientos.</p>

        {/* Resumen */}
        <div className="progreso-resumen">
          {resumen.map((r, i) => (
            <div className="resumen-card" key={i}>
              <span className="resumen-icono">{r.icono}</span>
              <div>
                <p className="resumen-valor">{r.valor}</p>
                <p className="resumen-label">{r.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gráficas */}
        <div className="graficas-seccion">
          <div className="graficas-header">
            <div className="graficas-tabs">
              {graficas.map((g) => (
                <button
                  key={g.key}
                  className={`grafica-tab ${graficaActiva === g.key ? 'activo' : ''}`}
                  style={graficaActiva === g.key ? { borderColor: g.color, color: g.color } : {}}
                  onClick={() => setGraficaActiva(g.key)}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <div className="periodo-tabs">
              <button
                className={`periodo-btn ${periodo === 'semana' ? 'activo' : ''}`}
                onClick={() => setPeriodo('semana')}
              >
                Semana
              </button>
              <button
                className={`periodo-btn ${periodo === 'mes' ? 'activo' : ''}`}
                onClick={() => setPeriodo('mes')}
              >
                Mes
              </button>
            </div>
          </div>

          <div className="grafica-caja">
            <ResponsiveContainer width="100%" height={280}>
              {graficaActiva === 'entrenamientos' ? (
                <BarChart data={datos} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey={ejeX} tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar
                    dataKey="entrenamientos"
                    fill="#27ae60"
                    radius={[6, 6, 0, 0]}
                    name="Entrenamientos"
                  />
                </BarChart>
              ) : (
                <LineChart data={datos} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey={ejeX} tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={graficaActiva}
                    stroke={graficas.find((g) => g.key === graficaActiva)?.color}
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name={graficas.find((g) => g.key === graficaActiva)?.label}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historial */}
        <div className="historial-seccion">
          <h2 className="historial-titulo">Historial de entrenamientos</h2>
          <div className="historial-lista">
            {historial.length === 0 ? (
              <p className="sin-entrenamientos">
                Aún no has completado ningún entrenamiento. ¡Empieza ahora desde Rutinas!
              </p>
            ) : (
              historial.map((h) => (
                <div key={h.id} className={`historial-item ${!h.completado ? 'incompleto' : ''}`}>
                  <div className="historial-estado">{h.completado ? '✅' : '⚠️'}</div>
                  <div className="historial-info">
                    <p className="historial-rutina">{h.rutina}</p>
                    <p className="historial-fecha">{h.fecha}</p>
                  </div>
                  <div className="historial-stats">
                    <span>⏱️ {h.duracion}</span>
                    <span>🔥 {h.calorias} kcal</span>
                  </div>
                  <span className="historial-nivel" style={{ background: colorNivel[h.nivel] }}>
                    {h.nivel}
                  </span>
                </div>
              )))
            }
          </div>
        </div>

      </main>
    </div>
  );
}

export default Progreso;