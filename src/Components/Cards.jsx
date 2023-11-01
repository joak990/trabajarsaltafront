import React, { useState } from 'react';
import Card from './Card';
import { useSelector } from 'react-redux';
import Paginado from './Paginate';
import { compareAsc } from 'date-fns';

function Cards() {
  const jobs = useSelector(state => state.jobs);

  const [pagina, setPagina] = useState(1);
  const [porpagina, setPorpagina] = useState(9);
  const maximo = Math.ceil(jobs.length / porpagina);

  // Ordenar los trabajos por fecha de publicación (más recientes primero)
  const sortedJobs = jobs.sort((a, b) => compareAsc(new Date(b.FechaPublicacion), new Date(a.FechaPublicacion)));

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setPagina(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll hacia arriba
  };

  return (
    <div>
      <div className="flex flex-wrap -mx-2">
        {sortedJobs
          .slice((pagina - 1) * porpagina, pagina * porpagina)
          .map((empleo, index) => (
            <div className="w-[400px] sm:w-1/2 md:w-1/3 px-2 mb-4 mt-4" key={index}>
              <Card
                fechadb={empleo.FechaDB}
                content={empleo.content}
                phone={empleo.phone}
                salary={empleo.salary}
                name={empleo.user?.name}
              
              />
            </div>
          ))}
      </div>
      <Paginado
        totalItems={jobs.length}
        itemsPerPage={porpagina}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Cards;
