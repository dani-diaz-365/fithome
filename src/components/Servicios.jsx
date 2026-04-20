import './Servicios.css';

const servicios = [
  { icono: '🏋️', titulo: 'Rutinas personalizadas', descripcion: 'Adaptadas a tu nivel y equipamiento disponible.' },
  { icono: '👨‍🏫', titulo: 'Entrenadores online', descripcion: 'Contrata un entrenador personal desde casa.' },
  { icono: '🥗', titulo: 'Dietas y recetas', descripcion: 'Planes nutricionales ajustados a tus objetivos.' },
  { icono: '📈', titulo: 'Seguimiento de progreso', descripcion: 'Visualiza tu evolución semana a semana.' },
  { icono: '🛒', titulo: 'Tienda', descripcion: 'Productos de entrenamiento al mejor precio.' },
  { icono: '📱', titulo: 'Desde cualquier dispositivo', descripcion: 'Accede desde el móvil, tablet u ordenador.' },
];

function Servicios() {
  return (
    <section className="servicios" id="servicios">
      <h2>¿Qué incluye FitHome?</h2>
      <p className="servicios-subtitulo">Todo lo que necesitas para entrenar desde casa en una sola plataforma.</p>
      <div className="servicios-grid">
        {servicios.map((s, i) => (
          <div className="servicio-card" key={i}>
            <span className="servicio-icono">{s.icono}</span>
            <h3>{s.titulo}</h3>
            <p>{s.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Servicios;