import React, { useState } from 'react';
import Card from './Card';
import Paginado from './Paginate';
import CardContrata from './CardContrata';
import { useSelector } from 'react-redux';
import { compareAsc } from 'date-fns';

function CardsContrata({ filter }) {
  const candidates = useSelector(state => state.candidates);
  const [pagina, setPagina] = useState(1);
  const [porpagina, setPorpagina] = useState(10);
  const maximo = Math.ceil(candidates?.length / porpagina);

  // Ordenar los trabajos por fecha de publicación (más recientes primero)
  const sortedCandidatos = candidates?.sort((a, b) =>
    compareAsc(new Date(b.FechaPublicacion), new Date(a.FechaPublicacion))
  );

  // Filtrar los candidatos por la categoría seleccionada
  const candidatosFiltrados = sortedCandidatos?.filter(candidato =>
    filter ? candidato.sector === filter : true
  );

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setPagina(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll hacia arriba
  };

  return (
    <div>
      <div className="flex flex-col md:justify-center items-center">
        {candidatosFiltrados
          ?.slice((pagina - 1) * porpagina, pagina * porpagina)
          ?.map((candidato, index) => (
            <div className="w-[370px] h-[300px]  sm:w-1/2 px-2 mb-4 mt-4 mx-auto" key={index}>
              <CardContrata
                name={candidato.name}
                city={candidato.city}
                sector={candidato.sector}
                description={candidato.description}
                phone={candidato.phone}
                userid={candidato.user}
              />
            </div>
          ))}
      </div>
      <Paginado
        totalItems={candidatosFiltrados?.length}
        itemsPerPage={porpagina}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default CardsContrata;
