import './Precios.css';

const planes = [
  {
    nombre: 'Gratuito',
    precio: '0€',
    periodo: '',
    features: ['Rutinas básicas', 'Acceso limitado', 'Sin entrenador', 'Sin tienda'],
    cta: 'Empezar gratis',
    destacado: false,
  },
  {
    nombre: 'Premium',
    precio: '9,99€',
    periodo: '/ mes',
    features: ['Rutinas personalizadas', 'Seguimiento de progreso', 'Dietas incluidas', 'Acceso a la tienda'],
    cta: 'Suscribirme',
    destacado: true,
  },
  {
    nombre: 'Con entrenador',
    precio: '29,99€',
    periodo: '/ mes',
    features: ['Todo lo de Premium', 'Entrenador personal online', 'Plan 100% personalizado', 'Soporte directo'],
    cta: 'Contratar',
    destacado: false,
  },
];

function Precios() {
  return (
    <section className="precios" id="precios">
      <h2>Planes y precios</h2>
      <p className="precios-subtitulo">Elige el plan que mejor se adapte a ti.</p>
      <div className="precios-grid">
        {planes.map((p, i) => (
          <div className={`precio-card ${p.destacado ? 'destacado' : ''}`} key={i}>
            {p.destacado && <span className="badge">Más popular</span>}
            <h3>{p.nombre}</h3>
            <div className="precio-valor">
              <span className="precio-numero">{p.precio}</span>
              <span className="precio-periodo">{p.periodo}</span>
            </div>
            <ul>
              {p.features.map((f, j) => (
                <li key={j}>✓ {f}</li>
              ))}
            </ul>
            <a href="/registro" className={p.destacado ? 'btn-solid' : 'btn-outline-azul'}>{p.cta}</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Precios;