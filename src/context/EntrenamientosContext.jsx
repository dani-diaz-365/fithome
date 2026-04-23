import { createContext, useContext, useState } from 'react';

const EntrenamientosContext = createContext();

export function EntrenamientosProvider({ children }) {
  const [historial, setHistorial] = useState([]);

  const añadirEntrenamiento = (rutina) => {
    setHistorial((prev) => [
      {
        id:          Date.now(),
        fecha:       'Hoy',
        rutina:      rutina.titulo,
        duracion:    rutina.duracion,
        calorias:    Math.floor(Math.random() * 200) + 300,
        nivel:       rutina.nivel,
        completado:  true,
      },
      ...prev,
    ]);
  };

  return (
    <EntrenamientosContext.Provider value={{ historial, añadirEntrenamiento }}>
      {children}
    </EntrenamientosContext.Provider>
  );
}

export function useEntrenamientos() {
  return useContext(EntrenamientosContext);
}