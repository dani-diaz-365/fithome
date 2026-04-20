import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="fit">FIT</span><span className="home">HOME</span>
      </div>
      <ul className="navbar-links">
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#precios">Precios</a></li>
        <li><a href="#entrenadores">Entrenadores</a></li>
      </ul>
      <div className="navbar-botones">
        <a href="/login" className="btn-outline">Iniciar sesión</a>
        <a href="/registro" className="btn-solid">Empieza gratis</a>
      </div>
    </nav>
  );
}

export default Navbar;