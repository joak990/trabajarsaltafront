import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, changestatusread, getmychats, getmyprivatechat, sendMessage } from '../redux/Actions';

function MyMessages() {
  const dispatch = useDispatch();
  const [receiverId, setReceiverId] = useState(null);
  const selectedChat = useSelector((state) => state.selectedChat);
  const chats = useSelector((state) => state.getchats);

  const id = localStorage.getItem('id');
  const name = localStorage.getItem('name');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    dispatch(getmychats(id));
  }, [dispatch, id]);

  const [contents, setContents] = useState([]) 
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const handleChatClick = (userId) => {
    setReceiverId(userId);
    setContents([]);
    dispatch(getmyprivatechat({ userId1: id, userId2: userId }));
    const lastMessage = chats.find((message) => message.userId === userId)
    const data = {id:lastMessage.messageId,idUser:id}
    dispatch(changestatusread(data))
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const chatsUpdated = chats.map((chat) => {
      if (chat.userId === userId && chat.isRead === false) {
        chat.isRead = true;
      }
      return chat;
    });
    const unreadMessageCount = chatsUpdated.filter((chat) => !chat.isRead).length;
    localStorage.setItem('unreadMessageCount', unreadMessageCount.toString());
 
    
  };
  
  const [message, setMessage] = useState('');
  const selectedChatMessages = useSelector((state) => state.getprivatechat);
  const handleSendMessage = (userId) => {
    if (message.trim() !== '') {
      const data = {
        senderId: id,
        receiverId: receiverId, 
        content: message,
        name: name
      };
      console.log(data);
      dispatch(sendMessage(data));
      setContents([...contents, message]);
      setMessage(''); 
    }
  };

  const event = (event)=>{
    event.preventDefault();
  }

  return (
    <div className="md:flex  h-screen w-screen "> {/* Utilizamos "md:flex" para aplicar flexbox solo en tamaños de pantalla medianos y más grandes */}

      <div className="w-full md:w-1/4   border-r bg-gray-700 border-gray-300">
        <h2 className="text-xl  font-semibold  text-white p-4">Chats</h2>
        <ul>
          <li
            className={`py-2 px-4 hover:bg-gray-10 text-white cursor-pointer ${
              selectedChat === null ? 'font-semibold' : ''
            }`}
            onClick={() => handleChatClick(null)}
          >
           
          </li>
          {chats?.map((chat) => (
  <li
    key={chat?.userId}
    className={`py-2 px-4 hover:bg-gray-600 text-white cursor-pointer mt-2 font-semibold ${
      selectedChat === chat.userId ? 'font-semibold' : ''
    }`}
    onClick={() => handleChatClick(chat?.userId)}
  >
    {chat?.name}
    {chat?.status === true && (
      <span className='inline-block h-2 w-2 bg-green-500 rounded-full ml-2'></span>
    )}
    {chat?.status === false && (
      <span className='inline-block h-2 w-2 bg-gray-500 rounded-full ml-2'></span>
    )}
    
    {chat?.isRead === false && (
  <span className={`text-red-500 ml-2 ${unreadMessageCount === 1 ? 'invisible' : ''}`}>1</span>
)}
  </li>
))}

        </ul>
      </div>

      {/* Ventana de chat */}
      <div className="w-full md:w-3/4 p-4 bg-gray-200">
        <div className="text-gray-500  text-center"> {/* Utilizamos "md:mt-44" para aplicar margen superior solo en tamaños de pantalla medianos y más grandes */}
          {selectedChat === null
            ? 'Ve tus mensajes entrantes'
            : ""}
        </div>

        {/* Contenido del chat (Mensajes) */}
        <div className="border md:mt-10 border-gray-30  p-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}
        >

          {selectedChatMessages && selectedChatMessages.length > 0 ? (
            selectedChatMessages.map((message, index) => (
              <div
              ref={index === selectedChatMessages.length - 1 ? lastMessageRef : null}
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
            <div>aqui se mostrara el chat cargado.</div>
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
       
        </div>
        {selectedChatMessages && selectedChatMessages.length > 0 ? (
  <div className="md:mt-10">
    <form action="" onSubmit={event}>
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
    </form>
  </div>
) : null}

      </div>
    </div>
  );
}

export default MyMessages;
