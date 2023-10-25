import React from 'react';

const Card = ({ name, fechadb, content, phone, salary }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 h-full flex flex-col">
      <div className='flex justify-between'>
      <p className="text-gray-500 text-lg  mb-4"> {fechadb}</p>
      <div className='flex justify-center'>
      <h1 className="text-lg  text-gray-500 mb-4">Empleador: {name}</h1>
      </div>
      </div>
     
      
      
 
      <p className="text-gray-700 font-bold text-lg mb-4">{content}</p>
      <div className="mb-4">
        <h2 className="text-lg  text-gray-500 mb-2">Teléfono de contacto</h2>
        <p className="text-gray-700 font-bold">{phone}</p>
      </div>
      <div>
        <h2 className="text-xl  text-gray-500 mb-2">Expectativa Salarial</h2>
        <p className="text-gray-700 font-bold">${salary}</p>
      </div>
    </div>
  );
}

export default Card;
