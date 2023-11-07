import React, { useEffect, useState } from 'react';
import CardsContrata from '../Components/CardsContrata';
import { getcandidates, getmychats } from '../redux/Actions';
import { useDispatch } from 'react-redux';
import bg from "../assets/banner-images/tean.jpg";

function Contrata() {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState('');

  const id = localStorage.getItem("id");
  useEffect(() => {
    dispatch(getmychats(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getcandidates());
  }, [dispatch]);

  const applyFilter = (sector) => {
    setSelectedFilter(sector);
  };

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
  };

  const backgroundImageStyle = {
    background: `url(${bg}) center/cover no-repeat`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  const filterStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.1)',
  };

  const cardsContainerStyle = {
    position: 'relative', // Asegura que las tarjetas se muestren por encima
    zIndex: 1, // Z-index mayor para que estén por delante
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundImageStyle}></div>
      <div style={filterStyle}></div>
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
          {['Comercio', 'Construcción', 'Educación', 'Hotelería', 'Agricultura'].map((sector) => (
            <button
              key={sector}
              onClick={() => applyFilter(sector)}
              className={`w-full py-2 px-4 rounded text-center ${
                selectedFilter === sector ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>
      <div style={cardsContainerStyle}>
        <CardsContrata filter={selectedFilter} />
      </div>
    </div>
  );
}

export default Contrata;
