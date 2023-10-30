import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa'; // Importa el ícono de un sobre para enviar un mensaje
import ReactModal from 'react-modal'; // Importa ReactModal
import { useDispatch } from 'react-redux';
import { sendMessage } from '../redux/Actions';

const CardContrata = ({ name, description, city, phone, curriculum, userid }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  const [iduser, setIdUser] = useState('');

  const handleViewCurriculum = () => {
    if (curriculum) {
      window.open(curriculum, '_blank'); // Abre el enlace en una nueva pestaña
    }
  };

  const openModal = (userId) => {

    setIdUser(userId)
   
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const Myid =  localStorage?.getItem("id")
const data = {
  senderId:Myid,
  receiverId:iduser,
  content:message
}

  const handleSendMessage = () => {

     dispatch(sendMessage(data))
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 h-full flex flex-col">
      <div className="mb-4">
        <p className="font-semibold text-2xl text-start mb-2 border-gray-300">
          {city}
        </p>
        
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
      </div>

      <p className="text-gray-700 font-bold text-lg mb-4">{description}</p>
      
      <div className="mb-4">
        <h2 className="text-lg text-gray-500 mb-2"></h2>
        <p className=" text-white rounded-sm text-base">
          <button className="bg-slate-800 text-white rounded-sm" onClick={handleViewCurriculum}>
            Ver currículum
          </button>
          <div className="flex mt-14 justify-center">
          <button className="bg-blue-600 text-white rounded-full" onClick={() => openModal(userid)}>
            <FaEnvelope size={24} /> {/* Icono de sobre para enviar un mensaje */}
          </button>
        </div>
        </p>
      </div>

      <ReactModal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Enviar Mensaje"
  className="fixed inset-0 flex items-center justify-center"
  overlayClassName="fixed inset-0 backdrop-blur-md "
>
        <div className="bg-white rounded-lg shadow-xl  p-6 md:w-[400px] md:h-[240px] ">
          <h2 className="text-xl font-semibold mb-4">Enviar Mensaje a {name}</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white p-2 rounded-md mr-2"
              onClick={() => handleSendMessage()}
            >
              Enviar
            </button>
            <button className="bg-gray-400 text-white p-2 rounded-md" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default CardContrata;
