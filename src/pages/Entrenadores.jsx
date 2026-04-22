import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Entrenadores.css';

const entrenadores = [
  {
    id: 1,
    nombre: 'Carlos López',
    especialidad: 'Fuerza y musculación',
    experiencia: '8 años',
    precio: 29.99,
    valoracion: 4.9,
    reseñas: 124,
    disponible: true,
    descripcion: 'Especialista en entrenamiento de fuerza y hipertrofia. Campeón regional de powerlifting con amplia experiencia en preparación de atletas y usuarios de todos los niveles.',
    certificaciones: ['NSCA-CPT', 'Nutrición deportiva', 'Powerlifting coach'],
    especialidades: ['Fuerza', 'Hipertrofia', 'Powerlifting'],
    valoraciones: [
      { usuario: 'Daniel M.', puntos: 5, comentario: 'Increíble entrenador, muy profesional y siempre disponible.' },
      { usuario: 'Sara P.', puntos: 5, comentario: 'Gracias a Carlos conseguí mis primeras dominadas. 100% recomendable.' },
      { usuario: 'Marcos R.', puntos: 4, comentario: 'Muy buen método de entrenamiento, resultados visibles desde el primer mes.' },
    ],
  },
  {
    id: 2,
    nombre: 'Laura Sánchez',
    especialidad: 'Yoga y flexibilidad',
    experiencia: '6 años',
    precio: 24.99,
    valoracion: 4.8,
    reseñas: 98,
    disponible: true,
    descripcion: 'Instructora certificada de yoga y pilates. Experta en movilidad, flexibilidad y bienestar mental. Sus clases combinan técnicas orientales con métodos modernos de entrenamiento funcional.',
    certificaciones: ['RYT-200 Yoga', 'Pilates mat', 'Mindfulness coach'],
    especialidades: ['Yoga', 'Pilates', 'Flexibilidad', 'Meditación'],
    valoraciones: [
      { usuario: 'Ana G.', puntos: 5, comentario: 'Laura es fantástica, muy paciente y explica todo muy bien.' },
      { usuario: 'Pedro L.', puntos: 5, comentario: 'Mejoré mi flexibilidad notablemente en solo 2 meses.' },
      { usuario: 'María T.', puntos: 4, comentario: 'Clases muy relajantes y efectivas para el estrés.' },
    ],
  },
  {
    id: 3,
    nombre: 'Miguel Torres',
    especialidad: 'Cardio y pérdida de peso',
    experiencia: '5 años',
    precio: 19.99,
    valoracion: 4.7,
    reseñas: 76,
    disponible: false,
    descripcion: 'Especialista en entrenamiento cardiovascular y programas de pérdida de peso. Ha ayudado a más de 200 personas a alcanzar su peso ideal mediante métodos científicos y sostenibles.',
    certificaciones: ['ACSM-CPT', 'Nutrición clínica', 'CrossFit L1'],
    especialidades: ['Cardio', 'HIIT', 'Pérdida de peso', 'CrossFit'],
    valoraciones: [
      { usuario: 'Lucía F.', puntos: 5, comentario: 'Perdí 12kg en 4 meses siguiendo su programa. ¡Increíble!' },
      { usuario: 'Roberto S.', puntos: 4, comentario: 'Muy motivador, siempre pendiente de tu progreso.' },
      { usuario: 'Elena M.', puntos: 5, comentario: 'El mejor entrenador que he tenido. Totalmente recomendable.' },
    ],
  },
  {
    id: 4,
    nombre: 'Ana Martínez',
    especialidad: 'Entrenamiento funcional',
    experiencia: '7 años',
    precio: 27.99,
    valoracion: 4.9,
    reseñas: 112,
    disponible: true,
    descripcion: 'Experta en entrenamiento funcional y rehabilitación deportiva. Trabaja con atletas y personas con lesiones para recuperar la forma física de manera segura y progresiva.',
    certificaciones: ['CSCS', 'Fisioterapia deportiva', 'TRX Instructor'],
    especialidades: ['Funcional', 'Rehabilitación', 'TRX', 'Movilidad'],
    valoraciones: [
      { usuario: 'Javier C.', puntos: 5, comentario: 'Me recuperé de una lesión de rodilla gracias a Ana. Profesional top.' },
      { usuario: 'Carmen R.', puntos: 5, comentario: 'Sus entrenamientos son muy completos y adaptados a cada persona.' },
      { usuario: 'Tomás B.', puntos: 4, comentario: 'Muy buena metodología, se nota su experiencia.' },
    ],
  },
  {
    id: 5,
    nombre: 'David Ruiz',
    especialidad: 'Calistenia y street workout',
    experiencia: '4 años',
    precio: 22.99,
    valoracion: 4.6,
    reseñas: 54,
    disponible: true,
    descripcion: 'Atleta de calistenia y street workout. Especialista en movimientos de peso corporal avanzados. Enseña desde los fundamentos hasta habilidades como muscle-up, planche o human flag.',
    certificaciones: ['Calistenia avanzada', 'Street Workout coach', 'Nutrición deportiva'],
    especialidades: ['Calistenia', 'Street Workout', 'Peso corporal', 'Acrobacias'],
    valoraciones: [
      { usuario: 'Álvaro M.', puntos: 5, comentario: 'Aprendí el muscle-up en 6 semanas. ¡Increíble progreso!' },
      { usuario: 'Nuria P.', puntos: 4, comentario: 'Muy buen entrenador, explica muy bien cada movimiento.' },
      { usuario: 'Iván G.', puntos: 5, comentario: 'David es un crack, sus rutinas son muy efectivas.' },
    ],
  },
  {
    id: 6,
    nombre: 'Sofia Herrera',
    especialidad: 'Nutrición y wellness',
    experiencia: '9 años',
    precio: 34.99,
    valoracion: 5.0,
    reseñas: 156,
    disponible: true,
    descripcion: 'Dietista-nutricionista y entrenadora personal con enfoque holístico. Combina planes de entrenamiento personalizados con asesoramiento nutricional para resultados óptimos y duraderos.',
    certificaciones: ['Dietista-Nutricionista', 'Personal Trainer', 'Coaching nutricional'],
    especialidades: ['Nutrición', 'Wellness', 'Pérdida de grasa', 'Salud hormonal'],
    valoraciones: [
      { usuario: 'Paula V.', puntos: 5, comentario: 'Sofía cambió mi relación con la comida y el ejercicio. ¡La mejor!' },
      { usuario: 'Fernando L.', puntos: 5, comentario: 'Resultados increíbles, muy profesional y cercana.' },
      { usuario: 'Cristina M.', puntos: 5, comentario: 'Su enfoque holístico es exactamente lo que necesitaba.' },
    ],
  },
];

const especialidades = ['Todos', 'Fuerza', 'Cardio', 'Yoga', 'Funcional', 'Calistenia', 'Nutrición'];

function Estrellas({ valor }) {
  return (
    <div className="estrellas">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(valor) ? 'estrella llena' : 'estrella'}>★</span>
      ))}
    </div>
  );
}

function ModalEntrenador({ entrenador, onCerrar, onContratar }) {
  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-caja modal-entrenador" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={onCerrar}>✕</button>

        {/* Cabecera */}
        <div className="modal-ent-header">
          <div className="modal-avatar">
            {entrenador.nombre.charAt(0)}
          </div>
          <div>
            <h2>{entrenador.nombre}</h2>
            <p className="modal-especialidad">{entrenador.especialidad}</p>
            <div className="modal-rating">
              <Estrellas valor={entrenador.valoracion} />
              <span>{entrenador.valoracion} ({entrenador.reseñas} reseñas)</span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className="modal-descripcion">{entrenador.descripcion}</p>

        {/* Especialidades */}
        <div className="modal-seccion">
          <h4>Especialidades</h4>
          <div className="tags">
            {entrenador.especialidades.map((e, i) => (
              <span key={i} className="tag">{e}</span>
            ))}
          </div>
        </div>

        {/* Certificaciones */}
        <div className="modal-seccion">
          <h4>Certificaciones</h4>
          <div className="tags">
            {entrenador.certificaciones.map((c, i) => (
              <span key={i} className="tag tag-azul">{c}</span>
            ))}
          </div>
        </div>

        {/* Valoraciones */}
        <div className="modal-seccion">
          <h4>Valoraciones de usuarios</h4>
          <div className="valoraciones-lista">
            {entrenador.valoraciones.map((v, i) => (
              <div key={i} className="valoracion-item">
                <div className="valoracion-header">
                  <span className="valoracion-usuario">{v.usuario}</span>
                  <Estrellas valor={v.puntos} />
                </div>
                <p className="valoracion-comentario">"{v.comentario}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Precio y botón */}
        <div className="modal-footer">
          <div className="modal-precio">
            <span className="precio-num">{entrenador.precio}€</span>
            <span className="precio-per">/mes</span>
          </div>
          {entrenador.disponible ? (
            <button className="btn-contratar" onClick={() => onContratar(entrenador)}>
              Contratar entrenador
            </button>
          ) : (
            <button className="btn-no-disponible" disabled>
              No disponible ahora
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Entrenadores() {
  const [sidebarAbierto, setSidebarAbierto]     = useState(true);
  const [especialidadActiva, setEspecialidadActiva] = useState('Todos');
  const [soloDisponibles, setSoloDisponibles]   = useState(false);
  const [entrenadorModal, setEntrenadorModal]   = useState(null);
  const [contratado, setContratado]             = useState(null);

  const entrenadoresFiltrados = entrenadores.filter((e) => {
    const okEsp  = especialidadActiva === 'Todos' ||
      e.especialidades.some((esp) => esp.toLowerCase().includes(especialidadActiva.toLowerCase())) ||
      e.especialidad.toLowerCase().includes(especialidadActiva.toLowerCase());
    const okDisp = !soloDisponibles || e.disponible;
    return okEsp && okDisp;
  });

  const handleContratar = (entrenador) => {
    setContratado(entrenador);
    setEntrenadorModal(null);
  };

  return (
    <div className="entrenadores-layout">
      <Sidebar abierto={sidebarAbierto} setAbierto={setSidebarAbierto} />

      <main className="entrenadores-main">
        <h1 className="entrenadores-titulo">Entrenadores personales</h1>
        <p className="entrenadores-subtitulo">Encuentra tu entrenador ideal y empieza hoy mismo.</p>

        {/* Confirmación contratación */}
        {contratado && (
          <div className="contratado-banner">
            ✅ ¡Has contratado a <strong>{contratado.nombre}</strong>! En breve recibirás un mensaje para comenzar.
            <button onClick={() => setContratado(null)}>✕</button>
          </div>
        )}

        {/* Filtros */}
        <div className="filtros-entrenadores">
          <div className="filtro-grupo">
            <span className="filtro-etiqueta">Especialidad:</span>
            {especialidades.map((e) => (
              <button
                key={e}
                className={`filtro-btn ${especialidadActiva === e ? 'activo' : ''}`}
                onClick={() => setEspecialidadActiva(e)}
              >
                {e}
              </button>
            ))}
          </div>
          <label className="filtro-disponible">
            <input
              type="checkbox"
              checked={soloDisponibles}
              onChange={() => setSoloDisponibles(!soloDisponibles)}
            />
            Solo disponibles ahora
          </label>
        </div>

        {/* Grid entrenadores */}
        <div className="entrenadores-grid">
          {entrenadoresFiltrados.length === 0 && (
            <p className="sin-resultados">No hay entrenadores con estos filtros.</p>
          )}
          {entrenadoresFiltrados.map((ent) => (
            <div key={ent.id} className="entrenador-card">
              <div className="card-avatar">{ent.nombre.charAt(0)}</div>

              <div className={`disponibilidad ${ent.disponible ? 'online' : 'offline'}`}>
                {ent.disponible ? '● Online' : '● No disponible'}
              </div>

              <h3 className="card-nombre">{ent.nombre}</h3>
              <p className="card-especialidad">{ent.especialidad}</p>

              <div className="card-rating">
                <Estrellas valor={ent.valoracion} />
                <span>{ent.valoracion} ({ent.reseñas})</span>
              </div>

              <div className="card-info">
                <span>🏅 {ent.experiencia}</span>
                <span>💰 {ent.precio}€/mes</span>
              </div>

              <button
                className="btn-ver-perfil"
                onClick={() => setEntrenadorModal(ent)}
              >
                Ver perfil →
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {entrenadorModal && (
        <ModalEntrenador
          entrenador={entrenadorModal}
          onCerrar={() => setEntrenadorModal(null)}
          onContratar={handleContratar}
        />
      )}
    </div>
  );
}

export default Entrenadores;