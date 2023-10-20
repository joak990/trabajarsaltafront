import React from 'react';

const Card = ({ name, fechadb, content, phone, salary }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 h-full flex flex-col">
      <h1 className="text-xl  text-gray-500 mb-4">Nombre del Empleador: {name}</h1>
      <div className='flex flex-start '>
      <p className="text-gray-500 text-lg  mb-4"> {fechadb}</p>
      </div>
 
      <p className="text-gray-700 font-bold text-lg mb-4">{content}</p>
      <div className="mb-4">
        <h2 className="text-xl  text-gray-500 mb-2">Teléfono de contacto</h2>
        <p className="text-gray-700 font-bold">{phone}</p>
      </div>
      <div>
        <h2 className="text-xl  text-gray-500 mb-2">Salario por día</h2>
        <p className="text-gray-700 font-bold">${salary}</p>
      </div>
    </div>
  );
}

export default Card;
