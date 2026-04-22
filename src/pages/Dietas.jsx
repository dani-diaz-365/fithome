import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Dietas.css';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const objetivos = ['Perder peso', 'Ganar músculo', 'Mantenimiento'];

const planes = {
  'Perder peso': {
    calorias: 1600,
    descripcion: 'Déficit calórico moderado para perder grasa manteniendo músculo.',
    color: '#e74c3c',
    icono: '🔥',
    semana: {
      Lunes: {
        desayuno: { nombre: 'Avena con frutas', calorias: 320, proteinas: 12, carbos: 55, grasas: 6 },
        almuerzo: { nombre: 'Ensalada de pollo a la plancha', calorias: 420, proteinas: 38, carbos: 20, grasas: 14 },
        merienda: { nombre: 'Yogur griego con nueces', calorias: 180, proteinas: 10, carbos: 12, grasas: 9 },
        cena:     { nombre: 'Merluza al horno con verduras', calorias: 350, proteinas: 34, carbos: 18, grasas: 10 },
      },
      Martes: {
        desayuno: { nombre: 'Tostadas integrales con aguacate', calorias: 340, proteinas: 10, carbos: 40, grasas: 15 },
        almuerzo: { nombre: 'Sopa de verduras con pavo', calorias: 380, proteinas: 32, carbos: 28, grasas: 10 },
        merienda: { nombre: 'Manzana con mantequilla de cacahuete', calorias: 190, proteinas: 5, carbos: 25, grasas: 8 },
        cena:     { nombre: 'Tortilla de claras con espinacas', calorias: 280, proteinas: 28, carbos: 8, grasas: 12 },
      },
      Miércoles: {
        desayuno: { nombre: 'Batido de proteínas con plátano', calorias: 300, proteinas: 28, carbos: 38, grasas: 4 },
        almuerzo: { nombre: 'Arroz integral con verduras salteadas', calorias: 410, proteinas: 14, carbos: 72, grasas: 8 },
        merienda: { nombre: 'Zanahorias con hummus', calorias: 150, proteinas: 5, carbos: 18, grasas: 6 },
        cena:     { nombre: 'Salmón a la plancha con brócoli', calorias: 390, proteinas: 36, carbos: 12, grasas: 18 },
      },
      Jueves: {
        desayuno: { nombre: 'Huevos revueltos con tomate', calorias: 280, proteinas: 18, carbos: 10, grasas: 16 },
        almuerzo: { nombre: 'Lentejas con verduras', calorias: 400, proteinas: 22, carbos: 58, grasas: 6 },
        merienda: { nombre: 'Fruta de temporada', calorias: 120, proteinas: 2, carbos: 28, grasas: 1 },
        cena:     { nombre: 'Pechuga de pollo con ensalada', calorias: 360, proteinas: 40, carbos: 14, grasas: 12 },
      },
      Viernes: {
        desayuno: { nombre: 'Porridge de avena con miel', calorias: 330, proteinas: 10, carbos: 58, grasas: 6 },
        almuerzo: { nombre: 'Wrap de pavo con vegetales', calorias: 420, proteinas: 30, carbos: 45, grasas: 10 },
        merienda: { nombre: 'Puñado de almendras', calorias: 170, proteinas: 6, carbos: 6, grasas: 15 },
        cena:     { nombre: 'Dorada al horno con patata', calorias: 380, proteinas: 32, carbos: 30, grasas: 12 },
      },
      Sábado: {
        desayuno: { nombre: 'Pancakes de avena y plátano', calorias: 360, proteinas: 14, carbos: 60, grasas: 8 },
        almuerzo: { nombre: 'Ensalada mediterránea con atún', calorias: 390, proteinas: 34, carbos: 22, grasas: 16 },
        merienda: { nombre: 'Batido verde de espinacas', calorias: 140, proteinas: 4, carbos: 24, grasas: 3 },
        cena:     { nombre: 'Revuelto de gambas con champiñones', calorias: 320, proteinas: 30, carbos: 10, grasas: 14 },
      },
      Domingo: {
        desayuno: { nombre: 'Tostadas con queso fresco y tomate', calorias: 300, proteinas: 14, carbos: 38, grasas: 10 },
        almuerzo: { nombre: 'Pollo asado con verduras al horno', calorias: 450, proteinas: 42, carbos: 28, grasas: 14 },
        merienda: { nombre: 'Yogur natural con frutos rojos', calorias: 150, proteinas: 8, carbos: 18, grasas: 4 },
        cena:     { nombre: 'Crema de calabaza con semillas', calorias: 260, proteinas: 8, carbos: 32, grasas: 10 },
      },
    },
  },
  'Ganar músculo': {
    calorias: 2800,
    descripcion: 'Superávit calórico con alto aporte proteico para favorecer la hipertrofia.',
    color: '#1a3a5c',
    icono: '💪',
    semana: {
      Lunes: {
        desayuno: { nombre: 'Tortilla de 4 huevos con avena', calorias: 520, proteinas: 36, carbos: 48, grasas: 18 },
        almuerzo: { nombre: 'Arroz con pollo y legumbres', calorias: 680, proteinas: 52, carbos: 78, grasas: 14 },
        merienda: { nombre: 'Batido de proteínas con leche', calorias: 350, proteinas: 40, carbos: 28, grasas: 8 },
        cena:     { nombre: 'Ternera con pasta integral', calorias: 620, proteinas: 48, carbos: 65, grasas: 16 },
      },
      Martes: {
        desayuno: { nombre: 'Porridge con proteína y frutos secos', calorias: 540, proteinas: 32, carbos: 62, grasas: 18 },
        almuerzo: { nombre: 'Salmón con quinoa y aguacate', calorias: 650, proteinas: 44, carbos: 55, grasas: 24 },
        merienda: { nombre: 'Pan integral con atún y tomate', calorias: 320, proteinas: 28, carbos: 35, grasas: 8 },
        cena:     { nombre: 'Pechuga de pavo con boniato', calorias: 580, proteinas: 50, carbos: 58, grasas: 10 },
      },
      Miércoles: {
        desayuno: { nombre: 'Gachas de avena con plátano y miel', calorias: 480, proteinas: 18, carbos: 80, grasas: 10 },
        almuerzo: { nombre: 'Hamburguesa de ternera con arroz', calorias: 700, proteinas: 55, carbos: 70, grasas: 20 },
        merienda: { nombre: 'Requesón con nueces y miel', calorias: 340, proteinas: 24, carbos: 22, grasas: 16 },
        cena:     { nombre: 'Merluza con lentejas rojas', calorias: 560, proteinas: 48, carbos: 52, grasas: 12 },
      },
      Jueves: {
        desayuno: { nombre: 'Huevos benedictinos con salmón', calorias: 560, proteinas: 38, carbos: 35, grasas: 26 },
        almuerzo: { nombre: 'Pollo al curry con arroz basmati', calorias: 690, proteinas: 50, carbos: 75, grasas: 16 },
        merienda: { nombre: 'Batido de masa ganadora', calorias: 420, proteinas: 36, carbos: 55, grasas: 8 },
        cena:     { nombre: 'Bacalao con patatas y pimientos', calorias: 580, proteinas: 45, carbos: 60, grasas: 12 },
      },
      Viernes: {
        desayuno: { nombre: 'Tostadas con mantequilla y huevos', calorias: 500, proteinas: 28, carbos: 50, grasas: 20 },
        almuerzo: { nombre: 'Pasta con salsa boloñesa de ternera', calorias: 720, proteinas: 48, carbos: 82, grasas: 18 },
        merienda: { nombre: 'Yogur griego con granola', calorias: 360, proteinas: 20, carbos: 42, grasas: 12 },
        cena:     { nombre: 'Chuletas de cerdo con verduras', calorias: 620, proteinas: 50, carbos: 30, grasas: 28 },
      },
      Sábado: {
        desayuno: { nombre: 'Pancakes proteicos con sirope', calorias: 540, proteinas: 34, carbos: 65, grasas: 14 },
        almuerzo: { nombre: 'Paella de pollo y verduras', calorias: 700, proteinas: 46, carbos: 85, grasas: 14 },
        merienda: { nombre: 'Bocadillo de pavo y queso', calorias: 380, proteinas: 28, carbos: 40, grasas: 12 },
        cena:     { nombre: 'Solomillo con puré de patatas', calorias: 660, proteinas: 52, carbos: 55, grasas: 22 },
      },
      Domingo: {
        desayuno: { nombre: 'Revuelto de huevos con jamón', calorias: 480, proteinas: 36, carbos: 20, grasas: 28 },
        almuerzo: { nombre: 'Cocido completo con garbanzos', calorias: 750, proteinas: 54, carbos: 80, grasas: 20 },
        merienda: { nombre: 'Fruta con yogur y proteína', calorias: 300, proteinas: 24, carbos: 35, grasas: 6 },
        cena:     { nombre: 'Atún a la plancha con ensalada', calorias: 420, proteinas: 48, carbos: 18, grasas: 14 },
      },
    },
  },
  'Mantenimiento': {
    calorias: 2200,
    descripcion: 'Aporte calórico equilibrado para mantener el peso y la composición corporal.',
    color: '#27ae60',
    icono: '⚖️',
    semana: {
      Lunes: {
        desayuno: { nombre: 'Tostadas con aguacate y huevo', calorias: 420, proteinas: 18, carbos: 42, grasas: 18 },
        almuerzo: { nombre: 'Ensalada de pasta con pollo', calorias: 520, proteinas: 34, carbos: 58, grasas: 14 },
        merienda: { nombre: 'Fruta y yogur natural', calorias: 180, proteinas: 8, carbos: 28, grasas: 4 },
        cena:     { nombre: 'Lubina al vapor con arroz', calorias: 460, proteinas: 36, carbos: 48, grasas: 10 },
      },
      Martes: {
        desayuno: { nombre: 'Müsli con leche y frutas', calorias: 400, proteinas: 14, carbos: 65, grasas: 10 },
        almuerzo: { nombre: 'Lentejas estofadas con verduras', calorias: 500, proteinas: 24, carbos: 70, grasas: 8 },
        merienda: { nombre: 'Tostada con queso cottage', calorias: 200, proteinas: 12, carbos: 22, grasas: 6 },
        cena:     { nombre: 'Merluza con ensalada y patata', calorias: 440, proteinas: 34, carbos: 40, grasas: 12 },
      },
      Miércoles: {
        desayuno: { nombre: 'Batido de avena y frutas', calorias: 380, proteinas: 14, carbos: 62, grasas: 8 },
        almuerzo: { nombre: 'Pollo al horno con verduras', calorias: 510, proteinas: 42, carbos: 32, grasas: 16 },
        merienda: { nombre: 'Nueces y fruta seca', calorias: 220, proteinas: 6, carbos: 20, grasas: 14 },
        cena:     { nombre: 'Tortilla francesa con ensalada', calorias: 380, proteinas: 22, carbos: 14, grasas: 22 },
      },
      Jueves: {
        desayuno: { nombre: 'Porridge con semillas de chía', calorias: 390, proteinas: 14, carbos: 58, grasas: 12 },
        almuerzo: { nombre: 'Arroz salteado con gambas', calorias: 530, proteinas: 30, carbos: 65, grasas: 12 },
        merienda: { nombre: 'Yogur griego con miel', calorias: 190, proteinas: 12, carbos: 20, grasas: 6 },
        cena:     { nombre: 'Pavo con champiñones y quinoa', calorias: 480, proteinas: 40, carbos: 44, grasas: 12 },
      },
      Viernes: {
        desayuno: { nombre: 'Huevos con tostadas integrales', calorias: 410, proteinas: 22, carbos: 40, grasas: 16 },
        almuerzo: { nombre: 'Salmón con patatas y espárragos', calorias: 540, proteinas: 38, carbos: 42, grasas: 20 },
        merienda: { nombre: 'Manzana con crema de almendras', calorias: 200, proteinas: 4, carbos: 26, grasas: 10 },
        cena:     { nombre: 'Pizza integral de verduras', calorias: 460, proteinas: 20, carbos: 62, grasas: 14 },
      },
      Sábado: {
        desayuno: { nombre: 'French toast con frutas', calorias: 430, proteinas: 16, carbos: 62, grasas: 14 },
        almuerzo: { nombre: 'Parrillada de verduras y pollo', calorias: 520, proteinas: 40, carbos: 35, grasas: 18 },
        merienda: { nombre: 'Batido de frutas naturales', calorias: 180, proteinas: 4, carbos: 38, grasas: 2 },
        cena:     { nombre: 'Bacalao con pisto de verduras', calorias: 420, proteinas: 34, carbos: 30, grasas: 14 },
      },
      Domingo: {
        desayuno: { nombre: 'Crepes con frutas y miel', calorias: 420, proteinas: 14, carbos: 68, grasas: 12 },
        almuerzo: { nombre: 'Cocido ligero con verduras', calorias: 550, proteinas: 36, carbos: 62, grasas: 14 },
        merienda: { nombre: 'Infusión con galletas de avena', calorias: 180, proteinas: 4, carbos: 30, grasas: 6 },
        cena:     { nombre: 'Ensalada completa con huevo', calorias: 380, proteinas: 22, carbos: 24, grasas: 18 },
      },
    },
  },
};

const comidas = ['desayuno', 'almuerzo', 'merienda', 'cena'];
const iconoComida = { desayuno: '🌅', almuerzo: '☀️', merienda: '🍎', cena: '🌙' };

function Dietas() {
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [objetivoActivo, setObjetivoActivo] = useState('Perder peso');
  const [diaActivo, setDiaActivo]           = useState('Lunes');
  const [modalComida, setModalComida]       = useState(null);

  const plan     = planes[objetivoActivo];
  const menuDia  = plan.semana[diaActivo];

  const totalCalorias  = comidas.reduce((acc, c) => acc + menuDia[c].calorias, 0);
  const totalProteinas = comidas.reduce((acc, c) => acc + menuDia[c].proteinas, 0);
  const totalCarbos    = comidas.reduce((acc, c) => acc + menuDia[c].carbos, 0);
  const totalGrasas    = comidas.reduce((acc, c) => acc + menuDia[c].grasas, 0);

  return (
    <div className="dietas-layout">
      <Sidebar abierto={sidebarAbierto} setAbierto={setSidebarAbierto} />

      <main className="dietas-main">
        <h1 className="dietas-titulo">Plan de dietas</h1>
        <p className="dietas-subtitulo">Selecciona tu objetivo y consulta el menú semanal.</p>

        {/* Selector de objetivo */}
        <div className="objetivos-tabs">
          {objetivos.map((obj) => (
            <button
              key={obj}
              className={`objetivo-tab ${objetivoActivo === obj ? 'activo' : ''}`}
              style={objetivoActivo === obj ? { background: planes[obj].color } : {}}
              onClick={() => setObjetivoActivo(obj)}
            >
              {planes[obj].icono} {obj}
            </button>
          ))}
        </div>

        {/* Info del plan */}
        <div className="plan-info" style={{ borderColor: plan.color }}>
          <div>
            <h3 style={{ color: plan.color }}>{plan.icono} Plan {objetivoActivo}</h3>
            <p>{plan.descripcion}</p>
          </div>
          <div className="plan-calorias" style={{ background: plan.color }}>
            <span className="calorias-num">{plan.calorias}</span>
            <span className="calorias-label">kcal/día</span>
          </div>
        </div>

        {/* Selector de día */}
        <div className="dias-tabs">
          {dias.map((dia) => (
            <button
              key={dia}
              className={`dia-tab ${diaActivo === dia ? 'activo' : ''}`}
              onClick={() => setDiaActivo(dia)}
            >
              {dia.substring(0, 3)}
            </button>
          ))}
        </div>

        {/* Resumen de macros del día */}
        <div className="macros-resumen">
          {[
            { label: 'Calorías',  valor: `${totalCalorias} kcal`, color: plan.color },
            { label: 'Proteínas', valor: `${totalProteinas}g`,    color: '#1a3a5c' },
            { label: 'Carbos',    valor: `${totalCarbos}g`,       color: '#f47c20' },
            { label: 'Grasas',    valor: `${totalGrasas}g`,       color: '#27ae60' },
          ].map((m, i) => (
            <div className="macro-card" key={i} style={{ borderTop: `4px solid ${m.color}` }}>
              <span className="macro-valor" style={{ color: m.color }}>{m.valor}</span>
              <span className="macro-label">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Comidas del día */}
        <div className="comidas-grid">
          {comidas.map((comida) => {
            const item = menuDia[comida];
            return (
              <div
                key={comida}
                className="comida-card"
                onClick={() => setModalComida({ comida, item })}
              >
                <div className="comida-header">
                  <span className="comida-icono">{iconoComida[comida]}</span>
                  <span className="comida-nombre">{comida.charAt(0).toUpperCase() + comida.slice(1)}</span>
                </div>
                <h4 className="comida-plato">{item.nombre}</h4>
                <div className="comida-macros">
                  <span>🔥 {item.calorias} kcal</span>
                  <span>💪 {item.proteinas}g prot</span>
                </div>
                <span className="comida-ver">Ver detalles →</span>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal detalle comida */}
      {modalComida && (
        <div className="modal-overlay" onClick={() => setModalComida(null)}>
          <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setModalComida(null)}>✕</button>
            <div className="modal-comida-header">
              <span className="modal-comida-icono">{iconoComida[modalComida.comida]}</span>
              <div>
                <p className="modal-comida-tipo">
                  {modalComida.comida.charAt(0).toUpperCase() + modalComida.comida.slice(1)} · {diaActivo}
                </p>
                <h2>{modalComida.item.nombre}</h2>
              </div>
            </div>
            <div className="modal-macros-grid">
              {[
                { label: 'Calorías',  valor: `${modalComida.item.calorias} kcal`, color: plan.color },
                { label: 'Proteínas', valor: `${modalComida.item.proteinas}g`,    color: '#1a3a5c' },
                { label: 'Carbohidratos', valor: `${modalComida.item.carbos}g`,   color: '#f47c20' },
                { label: 'Grasas',    valor: `${modalComida.item.grasas}g`,       color: '#27ae60' },
              ].map((m, i) => (
                <div className="modal-macro" key={i} style={{ borderLeft: `4px solid ${m.color}` }}>
                  <span className="modal-macro-valor" style={{ color: m.color }}>{m.valor}</span>
                  <span className="modal-macro-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dietas;