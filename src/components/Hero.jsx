import './Hero.css';
import logo from '../assets/Logo.png';
 
function Hero() {
  return (
    <section className="hero">
      <div className="hero-texto">
        <h1>Tu gimnasio,<br /><span>en casa.</span></h1>
        <p>Entrenamientos personalizados, entrenadores online, dietas y tienda. Todo en un solo lugar.</p>
        <div className="hero-botones">
          <a href="/registro" className="btn-solid">Empieza gratis</a>
          <a href="#servicios" className="btn-outline-dark">Ver servicios</a>
        </div>
      </div>
      <div className="hero-imagen">
        <img src={logo} alt="FitHome Logo" className="hero-logo" />
      </div>
    </section>
  );
}
 
export default Hero;