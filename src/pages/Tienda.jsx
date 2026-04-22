import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Tienda.css';

const productos = [
  // Ropa deportiva
  { id: 1, nombre: 'Camiseta técnica FitHome', categoria: 'Ropa', precio: 24.99, valoracion: 4.7, reseñas: 89, descripcion: 'Camiseta de alto rendimiento con tejido transpirable y secado rápido. Perfecta para entrenamientos intensos.', tallas: ['XS','S','M','L','XL'], colores: ['Negro', 'Blanco', 'Naranja'], icono: '👕' },
  { id: 2, nombre: 'Mallas de compresión', categoria: 'Ropa', precio: 34.99, valoracion: 4.8, reseñas: 112, descripcion: 'Mallas de compresión que mejoran la circulación y reducen la fatiga muscular durante el entrenamiento.', tallas: ['XS','S','M','L','XL'], colores: ['Negro', 'Azul'], icono: '🩳' },
  { id: 3, nombre: 'Sudadera FitHome Pro', categoria: 'Ropa', precio: 49.99, valoracion: 4.6, reseñas: 67, descripcion: 'Sudadera con capucha de algodón premium. Ideal para el calentamiento y el post-entrenamiento.', tallas: ['S','M','L','XL','XXL'], colores: ['Gris', 'Negro', 'Azul'], icono: '🧥' },
  { id: 4, nombre: 'Zapatillas training', categoria: 'Ropa', precio: 89.99, valoracion: 4.9, reseñas: 203, descripcion: 'Zapatillas de entrenamiento con suela antideslizante y amortiguación superior para todo tipo de ejercicios.', tallas: ['38','39','40','41','42','43','44','45'], colores: ['Negro', 'Blanco'], icono: '👟' },

  // Suplementos
  { id: 5, nombre: 'Proteína Whey 1kg', categoria: 'Suplementos', precio: 39.99, valoracion: 4.8, reseñas: 345, descripcion: 'Proteína de suero de leche de alta calidad con 24g de proteína por dosis. Sabor chocolate o vainilla.', tallas: [], colores: ['Chocolate', 'Vainilla', 'Fresa'], icono: '🥛' },
  { id: 6, nombre: 'Creatina monohidrato 500g', categoria: 'Suplementos', precio: 19.99, valoracion: 4.9, reseñas: 278, descripcion: 'Creatina monohidrato pura para mejorar el rendimiento y la fuerza en entrenamientos de alta intensidad.', tallas: [], colores: ['Natural'], icono: '💊' },
  { id: 7, nombre: 'Pre-entreno Energy Boost', categoria: 'Suplementos', precio: 29.99, valoracion: 4.6, reseñas: 156, descripcion: 'Fórmula avanzada con cafeína, beta-alanina y vitaminas B para maximizar tu energía antes del entrenamiento.', tallas: [], colores: ['Sandía', 'Limón', 'Frutas del bosque'], icono: '⚡' },
  { id: 8, nombre: 'Barritas proteicas (caja 12)', categoria: 'Suplementos', precio: 24.99, valoracion: 4.7, reseñas: 198, descripcion: 'Caja de 12 barritas proteicas con 20g de proteína por unidad. Sin azúcares añadidos.', tallas: [], colores: ['Chocolate', 'Cacahuete', 'Cookies'], icono: '🍫' },

  // Material
  { id: 9,  nombre: 'Mancuernas ajustables 20kg', categoria: 'Material', precio: 129.99, valoracion: 4.8, reseñas: 94, descripcion: 'Set de mancuernas ajustables de 2 a 20kg. Compactas y perfectas para entrenar en casa sin ocupar espacio.', tallas: [], colores: ['Negro'], icono: '🏋️' },
  { id: 10, nombre: 'Esterilla de yoga premium', categoria: 'Material', precio: 34.99, valoracion: 4.7, reseñas: 167, descripcion: 'Esterilla antideslizante de 6mm de grosor con superficie de agarre extra. Incluye correa de transporte.', tallas: [], colores: ['Negro', 'Morado', 'Verde'], icono: '🧘' },
  { id: 11, nombre: 'Bandas de resistencia (set 5)', categoria: 'Material', precio: 22.99, valoracion: 4.9, reseñas: 312, descripcion: 'Set de 5 bandas elásticas con diferentes niveles de resistencia. Ideales para glúteos, piernas y movilidad.', tallas: [], colores: ['Multicolor'], icono: '🔴' },
  { id: 12, nombre: 'Barra de dominadas', categoria: 'Material', precio: 44.99, valoracion: 4.6, reseñas: 78, descripcion: 'Barra de dominadas para puerta sin tornillos. Soporta hasta 150kg. Fácil instalación y desmontaje.', tallas: [], colores: ['Negro'], icono: '🔩' },
];

const categorias = ['Todos', 'Ropa', 'Suplementos', 'Material'];
const ordenOpciones = ['Relevancia', 'Precio: menor a mayor', 'Precio: mayor a menor', 'Mejor valorados'];

function Estrellas({ valor }) {
  return (
    <div className="estrellas">
      {[1,2,3,4,5].map((i) => (
        <span key={i} className={i <= Math.round(valor) ? 'estrella llena' : 'estrella'}>★</span>
      ))}
    </div>
  );
}

function ModalProducto({ producto, onCerrar, onAñadir }) {
  const [seleccion, setSeleccion] = useState('');
  const [cantidad, setCantidad]   = useState(1);
  const opciones = producto.tallas.length > 0 ? producto.tallas : producto.colores;

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={onCerrar}>✕</button>

        <div className="modal-producto-icono">{producto.icono}</div>
        <h2 className="modal-producto-nombre">{producto.nombre}</h2>
        <span className="modal-producto-cat">{producto.categoria}</span>

        <div className="modal-rating">
          <Estrellas valor={producto.valoracion} />
          <span>{producto.valoracion} ({producto.reseñas} reseñas)</span>
        </div>

        <p className="modal-producto-desc">{producto.descripcion}</p>

        {opciones.length > 0 && (
          <div className="modal-opciones">
            <label>{producto.tallas.length > 0 ? 'Talla:' : 'Variante:'}</label>
            <div className="opciones-btns">
              {opciones.map((op) => (
                <button
                  key={op}
                  className={`opcion-btn ${seleccion === op ? 'activo' : ''}`}
                  onClick={() => setSeleccion(op)}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="modal-cantidad">
          <label>Cantidad:</label>
          <div className="cantidad-ctrl">
            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>−</button>
            <span>{cantidad}</span>
            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
          </div>
        </div>

        <div className="modal-footer-producto">
          <span className="modal-precio-grande">{(producto.precio * cantidad).toFixed(2)}€</span>
          <button
            className="btn-añadir-carrito"
            onClick={() => {
              if (opciones.length > 0 && !seleccion) {
                alert('Por favor selecciona una opción.');
                return;
              }
              onAñadir({ ...producto, seleccion, cantidad });
              onCerrar();
            }}
          >
            🛒 Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalCarrito({ carrito, onCerrar, onEliminar, onCambiarCantidad, onVaciarCarrito }) {
  const [paso, setPaso] = useState(1);
  const [pedidoOk, setPedidoOk] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', direccion: '', tarjeta: '' });

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const handlePago = () => {
    if (!form.nombre || !form.email || !form.direccion || !form.tarjeta) {
      alert('Por favor rellena todos los campos.');
      return;
    }
    onVaciarCarrito();
    setPedidoOk(true);
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-caja modal-carrito" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={onCerrar}>✕</button>
        <h2 className="carrito-titulo">🛒 Tu carrito</h2>

        {pedidoOk ? (
          <div className="pedido-ok">
            <span className="pedido-ok-icono">🎉</span>
            <h3>¡Pedido realizado!</h3>
            <p>Recibirás un email de confirmación en breve.</p>
            <button className="btn-cerrar-ok" onClick={onCerrar}>Cerrar</button>
          </div>
        ) : (
          <>
            {/* Pasos */}
            <div className="pasos">
              {['Carrito', 'Datos', 'Pago'].map((p, i) => (
                <div key={i} className={`paso ${paso === i + 1 ? 'activo' : ''} ${paso > i + 1 ? 'hecho' : ''}`}>
                  <span className="paso-num">{paso > i + 1 ? '✓' : i + 1}</span>
                  <span className="paso-label">{p}</span>
                </div>
              ))}
            </div>

            {/* Paso 1: Carrito */}
            {paso === 1 && (
              <>
                {carrito.length === 0 ? (
                  <p className="carrito-vacio">Tu carrito está vacío.</p>
                ) : (
                  <div className="carrito-items">
                    {carrito.map((item, i) => (
                      <div key={i} className="carrito-item">
                        <span className="carrito-icono">{item.icono}</span>
                        <div className="carrito-info">
                          <p className="carrito-nombre">{item.nombre}</p>
                          {item.seleccion && <p className="carrito-sel">{item.seleccion}</p>}
                        </div>
                        <div className="cantidad-ctrl pequeño">
                          <button onClick={() => onCambiarCantidad(i, item.cantidad - 1)}>−</button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => onCambiarCantidad(i, item.cantidad + 1)}>+</button>
                        </div>
                        <span className="carrito-precio">{(item.precio * item.cantidad).toFixed(2)}€</span>
                        <button className="carrito-eliminar" onClick={() => onEliminar(i)}>🗑️</button>
                      </div>
                    ))}
                    <div className="carrito-total">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>
                )}
                <button
                  className="btn-siguiente"
                  disabled={carrito.length === 0}
                  onClick={() => setPaso(2)}
                >
                  Continuar →
                </button>
              </>
            )}

            {/* Paso 2: Datos */}
            {paso === 2 && (
              <>
                <div className="checkout-form">
                  {[
                    { label: 'Nombre completo', key: 'nombre', type: 'text', placeholder: 'Nombre Apellidos' },
                    { label: 'Email', key: 'email', type: 'email', placeholder: 'tu@email.com' },
                    { label: 'Dirección de envío', key: 'direccion', type: 'text', placeholder: 'Calle Mayor 1, Madrid' },
                  ].map((f) => (
                    <div key={f.key} className="form-group">
                      <label>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
                <div className="checkout-btns">
                  <button className="btn-volver-paso" onClick={() => setPaso(1)}>← Volver</button>
                  <button className="btn-siguiente" onClick={() => {
                    if (!form.nombre || !form.email || !form.direccion) {
                      alert('Rellena todos los campos.');
                      return;
                    }
                    setPaso(3);
                  }}>Continuar →</button>
                </div>
              </>
            )}

            {/* Paso 3: Pago */}
            {paso === 3 && (
              <>
                <div className="checkout-form">
                  <div className="form-group">
                    <label>Número de tarjeta</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={form.tarjeta}
                      onChange={(e) => setForm({ ...form, tarjeta: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Caducidad</label>
                      <input type="text" placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" maxLength={3} />
                    </div>
                  </div>
                  <div className="resumen-pago">
                    <span>Total a pagar</span>
                    <span className="total-grande">{total.toFixed(2)}€</span>
                  </div>
                </div>
                <div className="checkout-btns">
                  <button className="btn-volver-paso" onClick={() => setPaso(2)}>← Volver</button>
                  <button className="btn-pagar" onClick={handlePago}>💳 Pagar ahora</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Tienda() {
  const [sidebarAbierto, setSidebarAbierto] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [orden, setOrden] = useState('Relevancia');
  const [busqueda, setBusqueda] = useState('');
  const [productoModal, setProductoModal] = useState(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const vaciarCarrito = () => setCarrito([]);


  const productosFiltrados = productos
    .filter((p) => {
      const okCat  = categoriaActiva === 'Todos' || p.categoria === categoriaActiva;
      const okBusc = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      return okCat && okBusc;
    })
    .sort((a, b) => {
      if (orden === 'Precio: menor a mayor') return a.precio - b.precio;
      if (orden === 'Precio: mayor a menor') return b.precio - a.precio;
      if (orden === 'Mejor valorados')       return b.valoracion - a.valoracion;
      return 0;
    });

  const añadirAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.findIndex(
        (p) => p.id === producto.id && p.seleccion === producto.seleccion
      );
      if (existe >= 0) {
        const nuevo = [...prev];
        nuevo[existe].cantidad += producto.cantidad;
        return nuevo;
      }
      return [...prev, { ...producto }];
    });
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const cambiarCantidad = (index, cantidad) => {
    if (cantidad < 1) { eliminarDelCarrito(index); return; }
    setCarrito((prev) => {
      const nuevo = [...prev];
      nuevo[index].cantidad = cantidad;
      return nuevo;
    });
  };

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <div className="tienda-layout">
      <Sidebar abierto={sidebarAbierto} setAbierto={setSidebarAbierto} />

      <main className="tienda-main">

        {/* Header */}
        <div className="tienda-header">
          <div>
            <h1 className="tienda-titulo">Tienda FitHome</h1>
            <p className="tienda-subtitulo">Todo lo que necesitas para entrenar en casa.</p>
          </div>
          <button className="btn-carrito" onClick={() => setCarritoAbierto(true)}>
            🛒 Carrito
            {totalItems > 0 && <span className="carrito-badge">{totalItems}</span>}
          </button>
        </div>

        {/* Buscador y orden */}
        <div className="tienda-controles">
          <input
            className="buscador"
            type="text"
            placeholder="🔍 Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="select-orden"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            {ordenOpciones.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        {/* Categorías */}
        <div className="categorias-tabs">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`filtro-btn ${categoriaActiva === cat ? 'activo' : ''}`}
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid productos */}
        <div className="productos-grid">
          {productosFiltrados.length === 0 && (
            <p className="sin-resultados">No se encontraron productos.</p>
          )}
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="producto-card">
              <div className="producto-icono">{prod.icono}</div>
              <span className="producto-cat">{prod.categoria}</span>
              <h3 className="producto-nombre">{prod.nombre}</h3>
              <div className="producto-rating">
                <Estrellas valor={prod.valoracion} />
                <span>({prod.reseñas})</span>
              </div>
              <div className="producto-footer">
                <span className="producto-precio">{prod.precio}€</span>
                <button
                  className="btn-añadir"
                  onClick={() => setProductoModal(prod)}
                >
                  Ver producto
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal producto */}
      {productoModal && (
        <ModalProducto
          producto={productoModal}
          onCerrar={() => setProductoModal(null)}
          onAñadir={añadirAlCarrito}
        />
      )}

      {/* Modal carrito */}
      {carritoAbierto && (
        <ModalCarrito
          carrito={carrito}
          onCerrar={() => setCarritoAbierto(false)}
          onEliminar={eliminarDelCarrito}
          onCambiarCantidad={cambiarCantidad}
          onVaciarCarrito={vaciarCarrito}
        />
      )}
    </div>
  );
}

export default Tienda;