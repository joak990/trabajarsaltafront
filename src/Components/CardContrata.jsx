import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../redux/Actions';
import Swal from 'sweetalert2';

const CardContrata = ({ name, description, city, curriculum, userid, sector }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [iduser, setIdUser] = useState('');

  const handleViewCurriculum = () => {
    if (curriculum) {
      window.open(curriculum, '_blank');
    }
  };

  const openModal = (userId) => {
    setIdUser(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Myid = localStorage?.getItem("id");
  const data = {
    senderId: Myid,
    receiverId: iduser,
    content: message
  };

  const handleSendMessage = () => {
    dispatch(sendMessage(data));
    Swal.fire({
      icon: 'success',
      title: 'Se envió el mensaje al destinatario',
      showCancelButton: true,
    });
    closeModal();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 h-full flex flex-col">
      <div className="mb-4 flex justify-between">
        <div>
          <p className="font-extralight md:text-2xl  text-lg text-start mb-2 border-gray-300">
            {city}
          </p>
          
         
        </div>
        <div className="flex justify-center">
          <h1 className="md:text-2xl md:mt-0 mt-10 text-lg font-bold mb-2">{name}</h1>
          </div>
        <p className="font-extralight md:text-2xl  text-lg text-start mb-2 border-gray-300">
            {sector}
          </p>
      </div>

      <div className="description-container ">
        <p className="text-gray-700 font-bold md:text-2xl  text-lg " style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {description}
        </p>
      </div>

      
        <h2 className="text-lg text-gray-500 mb-2"></h2>
        <p className="text-white rounded-sm text-base">
         
          <div className="flex mt-2 md:mt-20 justify-center">
         
            <button className="bg-blue-600 text-white rounded-full" onClick={() => openModal(userid)}>
              <FaEnvelope size={24} />
            </button>
          </div>
        </p>
      

        <ReactModal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Enviar Mensaje"
  className={{
    base: 'fixed inset-0 flex items-center justify-center',
    afterOpen: 'fixed top-0 left-0 right-0 bottom-0 z-50', // Set a higher z-index value
    beforeClose: '',
  }}
  overlayClassName={{
    base: 'fixed inset-0 backdrop-blur-md z-40', // Set a higher z-index value
    afterOpen: '',
    beforeClose: '',
  }}
>

        <div className="bg-white rounded-lg shadow-xl p-6 md:w-[800px] md:h-[300px]">
          <h2 className="text-xl font-semibold mb-4">Enviar Mensaje a {name}</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="w-full p-2 border h-[150px] from-cyan-300 border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white p-2 rounded-md mr-2" onClick={() => handleSendMessage()}>
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
