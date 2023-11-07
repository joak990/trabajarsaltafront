import React from 'react';
import construc from "../assets/banner-images/construc.jpg"
const Card = ({ name, fechadb, content, phone, salary, sector, department ,hasConstructionPhoto }) => {
  return (
    <div className="rounded-3xl shadow-xl p-6 h-full flex flex-col bg-white border border-gray-300">
      <p className="text-gray-500 text-sm md:text-lg font-mono mb-2">{fechadb}</p>
      
      <div className="flex justify-between mb-2">
        <div className="flex">
          <p className="text-gray-500 text-sm md:text-lg font-mono">{sector}</p>
        </div>
        <div className="text-end">
          <p className="text-gray-500 text-sm md:text-lg font-mono">{department}</p>
        </div>
      </div>
      <p className="text-gray-700 font-bold text-sm md:text-lg mb-4 font-sans">{content}</p>
      <div className="mb-2">
        <h2 className="md:text-lg text-sm text-gray-500 font-mono">Teléfono de Contacto</h2>
        <p className="text-gray-700 text-sm md:text-lg font-bold font-sans">{phone}</p>
      </div>
      <div>
        <h2 className="md:text-lg text-sm text-gray-500 font-mono">Expectativa Salarial</h2>
        <p className="text-gray-700 text-sm md:text-lg font-bold font-sans">{salary}</p>
      </div>
      
    </div>
  );
}

export default Card;
