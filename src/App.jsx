import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Precios from './components/Precios';
import Footer from './components/Footer';
import Login from './pages/Login';
import Registro from './pages/Registro';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;