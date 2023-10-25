import React, { useState } from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import Paginado from './Paginate';
import { compareAsc } from 'date-fns';
import CardContrata from './CardContrata';
function CardsContrata() {
  const candidates = useSelector(state => state.candidates);

  const [pagina, setPagina] = useState(1);
  const [porpagina, setPorpagina] = useState(6);
  const maximo = Math.ceil(candidates?.length / porpagina);

  // Ordenar los trabajos por fecha de publicación (más recientes primero)
  const sortedCandidatos = candidates?.sort((a, b) =>
    compareAsc(new Date(b.FechaPublicacion), new Date(a.FechaPublicacion))
  );

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setPagina(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll hacia arriba
  };

  return (
    <div>
      <div className="flex flex-col md:justify-center items-center"> {/* Agregar 'items-center' para centrar verticalmente */}
        {candidates
          ?.slice((pagina - 1) * porpagina, pagina * porpagina)
          ?.map((candidato, index) => (
            <div className="w-[200px] h-[300px] sm:w-1/2 px-2 mb-4 mt-4 mx-auto" key={index}> {/* Agregar 'mx-auto' para centrar horizontalmente */}
              <CardContrata
                name={candidato.name}
                city={candidato.city}
                description={candidato.description}
                phone={candidato.phone}
                curriculum={candidato.curriculum}
              />
            </div>
          ))}
      </div>
      <Paginado
        totalItems={candidates?.length}
        itemsPerPage={porpagina}
        onPageChange={handlePageChange}
      />
    </div>
  );
}


export default CardsContrata;
