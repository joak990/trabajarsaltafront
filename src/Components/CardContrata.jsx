import React from 'react';

const CardContrata = ({ name, description, city, phone, curriculum }) => {
  const handleViewCurriculum = () => {
    if (curriculum) {
      window.open(curriculum, '_blank'); // Abre el enlace en una nueva pestaña
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 h-full flex flex-col">
      <div className="mb-4">
        <p className="font-semibold text-2xl text-start mb-2  w-15 border-gray-300">
          {city}
        </p>
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
      </div>
      <p className="text-gray-700 font-bold text-lg mb-4">{description}</p>
      <div className="mb-4">
        <h2 className="text-lg text-gray-500 mb-2">Teléfono de contacto:</h2>
        <p className="text-gray-700 font-bold text-base">{phone}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg text-gray-500 mb-2"></h2>
        <p className="bg-black text-white rounded-sm text-base">
          <button className='bg-black text-white rounded-sm' onClick={handleViewCurriculum}>
            Ver currículum
          </button>
        </p>
      </div>
    </div>
  );
}

export default CardContrata;
