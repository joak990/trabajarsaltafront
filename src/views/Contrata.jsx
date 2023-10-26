import React, { useEffect, useState } from 'react';
import CardsContrata from '../Components/CardsContrata';
import { getcandidates } from '../redux/Actions';
import { useDispatch } from 'react-redux';

function Contrata() {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(''); // Nuevo estado de filtro

  useEffect(() => {
    dispatch(getcandidates());
  }, [dispatch]);

  // Función para aplicar el filtro
  const applyFilter = (sector) => {
    setSelectedFilter(sector);
  };

  return (
    <div>
      {/* Agregar los botones de filtro */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        {['Comercio', 'Construcción', 'Educación', 'Hotelería', 'Agricultura'].map((sector) => (
          <button
            key={sector}
            onClick={() => applyFilter(sector)}
            className={`w-full py-2 px-4 rounded text-center ${
              selectedFilter === sector ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Renderizar los candidatos según el filtro seleccionado */}
      <CardsContrata filter={selectedFilter} />
    </div>
  );
}

export default Contrata;
