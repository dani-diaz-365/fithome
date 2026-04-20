import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.password || !form.confirmar) {
      setError('Por favor, rellena todos los campos.');
      return;
    }
    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setError('');
    // Aquí irá la llamada al backend PHP
    console.log('Registro:', form);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <span className="fit">FIT</span><span className="home">HOME</span>
        </div>

        <h2>Crear cuenta</h2>
        <p className="auth-subtitulo">Empieza gratis, sin tarjeta</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Daniel Díaz"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmar">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu contraseña"
              value={form.confirmar}
              onChange={handleChange}
            />
          </div>

          <div className="form-opciones">
            <label className="recuerdame">
              <input type="checkbox" required /> Acepto los <a href="/terminos">términos y condiciones</a>
            </label>
          </div>

          <button type="submit" className="btn-auth">Crear cuenta</button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>

      </div>

      <div className="auth-banner">
        <div className="auth-banner-contenido">
          <h2>Tu gimnasio.<br />Siempre contigo.</h2>
          <p>Rutinas, dietas y entrenadores personales desde cualquier dispositivo.</p>
        </div>
      </div>
    </div>
  );
}

export default Registro;