import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Precios from './components/Precios';
import Footer from './components/Footer';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Rutinas from './pages/Rutinas';
import Dietas from './pages/Dietas';
import Entrenadores from './pages/Entrenadores';
import Tienda from './pages/Tienda';
import './index.css';

function LandingPage() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rutinas" element={<Rutinas />} />
        <Route path="/dietas" element={<Dietas />} />
        <Route path="/entrenadores" element={<Entrenadores />} />
        <Route path="/tienda" element={<Tienda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;