import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.email || !form.password) {
    setError('Por favor, rellena todos los campos.');
    return;
  }

  try {
    const res = await fetch('http://localhost:8000/controllers/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:    form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Email o contraseña incorrectos.');
      return;
    }

    localStorage.setItem('usuario', JSON.stringify(data));
    window.location.href = '/dashboard';

  } catch (err) {
    setError('No se pudo conectar con el servidor.');
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <Link to="/" className="btn-volver">← Volver al inicio</Link>
          <span className="fit">FIT</span><span className="home">HOME</span>
        </div>

        <h2>Iniciar sesión</h2>
        <p className="auth-subtitulo">Bienvenido de nuevo</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-opciones">
            <label className="recuerdame">
              <input type="checkbox" /> Recuérdame
            </label>
            <a href="/recuperar" className="olvidaste">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-auth">Entrar</button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/registro">Regístrate gratis</Link>
        </p>

      </div>

      <div className="auth-banner">
        <div className="auth-banner-contenido">
          <h2>Entrena desde casa.<br />A tu ritmo.</h2>
          <p>Únete a FitHome y empieza hoy mismo con tu plan personalizado.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;