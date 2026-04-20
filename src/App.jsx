import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Precios from './components/Precios';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Servicios />
      <Precios />
      <Footer />
    </>
  );
}

export default App;