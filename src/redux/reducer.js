import { GET_ALL_POST, GET_CANDIDATES, GET_CHATS, GET_MY_PRIVATE_CHAT, ADD_MESSAGE } from "./types"; // Asegúrate de importar ADD_MESSAGE

const initialState = {
  jobs: [],
  candidates: [],
  getchats: [],
  getprivatechat: [], 
  isActive:[] // Inicializamos el arreglo de mensajes vacío
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POST:
      return {
        ...state,
        jobs: payload,
      };
    case GET_CANDIDATES:
      return {
        ...state,
        candidates: payload,
      };
    case GET_CHATS:
      return {
        ...state,
        getchats: payload,
      };
    case GET_MY_PRIVATE_CHAT:
      return {
        ...state,
        getprivatechat: payload,
      };
    case ADD_MESSAGE: // Manejamos la acción ADD_MESSAGE
      return {
        ...state,
        getprivatechat: [...state.getprivatechat, payload], // Agregamos el nuevo mensaje al arreglo de mensajes
      };
  

    default:
      return state;
  }
};

export default rootReducer;
