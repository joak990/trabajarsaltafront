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

  const [selectedSector, setSelectedSector] = useState('Todos'); // Sector seleccionado

  // Ordenar los trabajos por fecha de publicación (más recientes primero)
  const sortedJobs = jobs.sort((a, b) => compareAsc(new Date(b.FechaPublicacion), new Date(a.FechaPublicacion)));

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    setPagina(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll hacia arriba
  };

  const filteredJobs = selectedSector === 'Todos' ? sortedJobs : sortedJobs.filter(job => job.sector === selectedSector);

  return (
    <div>
      {/* Controles de filtro */}
      <div>
        <label className='text-white text-2xl bg-black rounde-lg font-bold' htmlFor="sectorFilter">Filtrar por Sector:</label>
        <select
        className='ml-4'
          id="sectorFilter"
          onChange={(e) => setSelectedSector(e.target.value)}
          value={selectedSector}
        >
          <option value="Todos">Todos</option>
          <option value="Comercio">Comercio</option>
          <option value="Construcción">Construcción</option>
          <option value="Educación">Educación</option>
          <option value="Hotelería">Hotelería</option>
          <option value="Agricultura">Agricultura</option>
        </select>
      </div>

      <div className="flex justify-center -mx-2 flex-wrap">
        {filteredJobs
          .slice((pagina - 1) * porpagina, pagina * porpagina)
          .map((empleo, index) => (
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 px-2 mb-4 mt-4" key={index}>
              <Card
                fechadb={empleo.FechaDB}
                content={empleo.content}
                phone={empleo.phone}
                salary={empleo.salary}
                name={empleo.user?.name}
                sector={empleo.sector}
                department={empleo.departament}
                hasConstructionPhoto={empleo.sector === 'Construcción'}
              />
            </div>
          ))}
      </div>
      <Paginado
        totalItems={filteredJobs.length}
        itemsPerPage={porpagina}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Cards;
