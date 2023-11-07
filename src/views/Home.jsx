import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getmychats, getposts } from "../redux/Actions";
import Cards from "../Components/Cards";

// Importa la imagen de fondo
import backgroundImg from '../assets/banner-images/startup.jpg'; // Reemplaza con la ruta correcta de tu imagen de fondo

function Home() {
  const jobs = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const empleos = jobs.length;
  const id = localStorage.getItem("id");
  
  useEffect(() => {
    dispatch(getmychats(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getposts());
  }, [dispatch]);

  const [empleo, setEmpleo] = useState();

  // Establece el estilo de fondo y brillo
  const backgroundStyle = {
    background: `url(${backgroundImg}) center/cover no-repeat`,
    filter: 'brightness(0.9)', // Ajusta el brillo según tus preferencias
    minHeight: '100vh',
  };

  const cardsContainerStyle = {
    background: 'transparent', // Fondo transparente
    position: 'relative',
    minHeight: '100vh',
  };

  return (
    <div className="home-container" style={backgroundStyle}>
      <div className="flex items-start justify-start ml-24"></div>
      <div className="flex items-center justify-around">
        <div className="bg-white"></div>
      </div>
      <div style={cardsContainerStyle}>
        <Cards/>
      </div>
    </div>
  );
}

export default Home;
