import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="fit">FIT</span><span className="home">HOME</span>
        <p>Tu gimnasio en casa</p>
      </div>
      <div className="footer-links">
        <a href="#servicios">Servicios</a>
        <a href="#precios">Precios</a>
        <a href="/login">Iniciar sesión</a>
        <a href="/registro">Registrarse</a>
      </div>
      <p className="footer-copy">© 2025 FitHome · Todos los derechos reservados</p>
    </footer>
  );
}

export default Footer;