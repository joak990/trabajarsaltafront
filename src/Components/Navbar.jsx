import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa'; // Importa el icono de mensajes

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Eliminar el 'id' del localStorage y realizar cualquier otra lógica de cierre de sesión
    localStorage.removeItem('id');
    // Agrega aquí cualquier otra lógica de cierre de sesión necesaria, como desautorización con Google
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-white text-lg font-bold ml-9">
          Salta Emplea
        </Link>
        <div className="hidden sm:flex items-end justify-center gap-16">
          <Link to="/" className="text-white  text-sm font-bold">
            Inicio
          </Link>
          <Link to="/about" className="text-white  text-sm font-bold">
            Acerca de Nosotros
          </Link>
          <Link to="/form-candidato" className="text-white  text-sm font-bold">
            Quiero ser Candidato
          </Link>
          <Link to="/contrata" className="text-white  text-sm font-bold">
            Contrata Candidatos
          </Link>
          <Link to="/form" className="text-white text-sm font-bold">
            Publica tu Anuncio
          </Link>
          <Link to="/login" className="text-white  text-sm font-bold" onClick={handleLogout}>
            {localStorage.getItem('id') ? 'Cerrar Sesión' : 'Ingresar'}
          </Link>
          {/* Agregar el icono de mensajes si existe el 'id' en el localStorage */}
          {localStorage.getItem('id') && (
            <Link to="/mymessages" className="text-white text-sm font-bold flex items-center">
              <FaEnvelope size={20} className="mr-2" />
              Mensajes
            </Link>
          )}
        </div>
      </div>

      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:text-gray-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          {isOpen && (
            <div className="mt-4 space-y-2">
              <Link
                to="/"
                className="text-white text-base font-medium block hover:text-gray-300 ml-4"
              >
                Inicio
              </Link>
              <Link
                to="/about"
                className="text-white text-base font-medium block hover:text-gray-300 ml-4"
              >
                 Acerca de Nosotros
              </Link>
              <Link
                to="/contrata"
                className="text-white text-base font-medium block hover:text-gray-300 ml-4"
              >
              Contrata Candidatos
              </Link>
              <Link
                to="/form"
                className="text-white text-base font-medium block hover:text-gray-300 ml-4"
              >
                Publica tu Anuncio
              </Link>
              <Link to="/form-candidato" className="text-white  text-sm font-bold">
            Quiero ser Candidato
          </Link>
              <Link
                to="/login"
                className="text-white text-base font-medium block hover:text-gray-300 ml-4"
                onClick={handleLogout}
              >
                {localStorage.getItem('id') ? 'Cerrar Sesión' : 'Ingresar'}
              </Link>
              {localStorage.getItem('id') && (
                <Link to="/mymessages" className="text-white text-base font-medium block hover:text-gray-300 ml-4">
                  
                  <FaEnvelope size={20} className="ml-32" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
