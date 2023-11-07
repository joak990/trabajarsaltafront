import React, { useEffect } from 'react';
import { getmychats } from '../redux/Actions';
import { useDispatch } from 'react-redux';

function About() {
  const id = localStorage.getItem("id")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getmychats(id));
  }, [dispatch, id]);
  return (
    <div className=" min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Clasificados Diarios 📰</h1>
        <p className="text-lg text-center mb-8">
          Encuentra las mejores ofertas laborales en la ciudad de Salta, Capital. 💼🌇
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Soy Empleador 💼</h2>
            <p className="text-gray-700">
              Si estás ofreciendo trabajo en Salta, Capital, aprovecha nuestra plataforma para publicar
              tu anuncio diariamente , es decir duran 24hs ademas es gratis! solo necesitas una cuenta. 📢💼
            </p>
            <div className="flex justify-center mt-8">
              <a
                href="/form"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
              >
                ¡Publica tu anuncio ahora!
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Búsqueda de trabajo 🔍</h2>
            <p className="text-gray-700">
              Si estás buscando trabajo en Salta, Capital, este es el lugar indicado.
              encuentra oportunidades laborales que se ajusten a tus necesidades ademas contamos con una expectativa salarial diaria ante cada empleo y es obligación del empleador decir una expectativa salarial. 📄💼💡
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center mt-10">
          <h2 className="text-xl font-bold mb-4">Creador del Proyecto 👨‍💻👨‍💻</h2>
          <p className="text-gray-700">
            Este proyecto fue creado por Joaquín Haidar.
            Soy un desarrollador  apasionado que ha trabajado para brindarte esta plataforma de clasificados diarios pero sobretodo dejar atras las estafas laborales en el mercado informal poniendo un requerimiento de salario diario en el clasificado laboral 💪🚀
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;