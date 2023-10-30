import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, getmychats, getmyprivatechat, sendMessage } from '../redux/Actions';

function MyMessages() {
  const dispatch = useDispatch();
  const [receiverId, setReceiverId] = useState(null);
  const selectedChat = useSelector((state) => state.selectedChat);
  const chats = useSelector((state) => state.getchats);
  const id = localStorage.getItem('id');
  const name = localStorage.getItem('name');
  useEffect(() => {
    dispatch(getmychats(id));
  }, [dispatch, id]);

  const [contents, setContents] = useState([]) // Estado para rastrear si estás escribiendo

  const handleChatClick = (userId) => {
    setReceiverId(userId);
    setContents([]);
    dispatch(getmyprivatechat({ userId1: id, userId2: userId }));
  };
  const [message, setMessage] = useState('');
  // Obtener mensajes del chat seleccionado desde el estado de Redux
  const selectedChatMessages = useSelector((state) => state.getprivatechat);
  const handleSendMessage = (userId) => {
    if (message.trim() !== '') {
      const data = {
        senderId: id,
        receiverId: receiverId, // Asegúrate de que esto sea el ID correcto del chat seleccionado
        content: message,
        name: name
      };
      console.log(data);
      dispatch(sendMessage(data));
      setContents([...contents, message]);
      setMessage(''); // Limpiamos el campo de mensaje después de enviar
    }
  };

  return (
    <div className="md:flex "> {/* Utilizamos "md:flex" para aplicar flexbox solo en tamaños de pantalla medianos y más grandes */}
      {/* Lista de chats (nombres de usuarios) en el costado */}
      <div className="w-full md:w-1/4   border-r border-gray-300">
        <h2 className="text-xl  font-semibold p-4">Chats</h2>
        <ul>
          <li
            className={`py-2 px-4 hover:bg-gray-100 cursor-pointer ${
              selectedChat === null ? 'font-semibold' : ''
            }`}
            onClick={() => handleChatClick(null)}
          >
            Ve tus mensajes entrantes
          </li>
          {chats?.map((chat) => (
            <li
              key={chat?.userId}
              className={`py-2 px-4 hover:bg-gray-100 cursor-pointer mt-2 font-semibold ${
                selectedChat === chat.userId ? 'font-semibold' : ''
              }`}
              onClick={() => handleChatClick(chat?.userId)}
            >
              {chat?.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Ventana de chat */}
      <div className="w-full md:w-3/4 p-4">
        <div className="text-gray-500 md:mt-44 text-center"> {/* Utilizamos "md:mt-44" para aplicar margen superior solo en tamaños de pantalla medianos y más grandes */}
          {selectedChat === null
            ? 'Ve tus mensajes entrantes'
            : 'Selecciona un chat para comenzar'}
        </div>

        {/* Contenido del chat (Mensajes) */}
        <div className="border md:mt-20 border-gray-300 p-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {selectedChatMessages && selectedChatMessages.length > 0 ? (
            selectedChatMessages.map((message, index) => (
              <div
                key={index}
                className="mb-2"
                style={{
                  display: 'flex',
                  justifyContent: message?.name === name ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  className={`p-2 rounded ${message?.name !== name ? 'bg-gray-300' : 'bg-green-200'}`}
                >
                  {message?.name === name ? 'Tú' : message?.name}:
                  <br />
                  {message?.content}
                </div>
              </div>
            ))
          ) : (
            <div>No hay mensajes en este chat.</div>
          )}
          {contents?.map((content, index) => (
            <div
              key={index}
              className="mb-2"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div className="p-2 rounded bg-green-200">
                Tú:
                <br />
                {content}
              </div>
            </div>
          ))}
        </div>

        {/* Caja de entrada de mensajes */}
        <div className="md:mt-10">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="w-full md:w-[600px] p-2 border border-gray-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded md:ml-2"
            onClick={handleSendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyMessages;
