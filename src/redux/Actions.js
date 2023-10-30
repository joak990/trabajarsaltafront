import axios from 'axios'
import { ADD_MESSAGE, GET_ALL_POST, GET_CANDIDATES, GET_CHATS, GET_MY_PRIVATE_CHAT } from './types';
import Swal from 'sweetalert2';

export const postjob = (payload) => {

    return async function () {
      try {
      console.log(payload);
        const response = await axios.post("https://trabajarsaltaback.vercel.app/createpost", payload)
        
        console.log(response);
        if (response.data === false) {
          Swal.fire({
            icon: 'info',
            title: 'Ya has publicado',
            text: 'Espera 24 horas para volver a publicar.',
          })}else{
            Swal.fire({
              icon: 'success',
              title: 'Anuncio Publicado con exíto',
              text: 'Espera 24 horas para volver a publicar.',
            })
          }
      } catch (error) {
        // Error en la petición
        console.error(error);
        return { success: false, message: "Error de creacion de comentario" };
      }
    };
    
  };
  export const candidatecreate = (payload) => {
    return async function () {
      try {
        console.log(payload);
        const response = await axios.post("https://trabajarsaltaback.vercel.app/candidate", payload);
        console.log(response);
  
        if (response.data === false) {
          Swal.fire({
            icon: 'info',
            title: 'Ya has publicado',
            text: 'Espera 24 horas para volver a publicar.',
          });
        }else{
          if (response.data === true) {
            Swal.fire({
              icon: 'success',
              title: 'Publicado con Exito!',
              text: 'Recuerda que en 24hs podras volver a hacerlo.',
            });
          }
        }
      } 
      catch (error) {
        // Manejo de errores
      }
    };
  };

  
  export function addMessage(message) {
    console.log(message,"message");
    return {
      
      type: ADD_MESSAGE,
      message, // El mensaje que deseas agregar
    
    };

  }
  

  export const register_google = (payload) => {

    return async function () {
      try {
      console.log(payload);
        const response = await axios.post("https://trabajarsaltaback.vercel.app/users", payload)
        
        
  return response.data
      } catch (error) {
        // Error en la petición
        console.error(error);
        return { success: false, message: "Error de creacion de comentario" };
      }
    };
    
  };


  export const sendMessage = (payload) => {

    return async function () {
      try {
      console.log(payload);
        const response = await axios.post("https://trabajarsaltaback.vercel.app/sendermessages", payload)
        
        console.log(response);
  return response.data
      } catch (error) {
        // Error en la petición
        console.error(error);
        return { success: false, message: "Error de creacion de comentario" };
      }
    };
    
  };

  export const getposts = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get("https://trabajarsaltaback.vercel.app/getallpost");
  
        return dispatch({
          type: GET_ALL_POST,
          payload: json.data,
        });
      } catch (error) {
       
      }
    };
  };

  export const getmychats = (id) => {
    return async function (dispatch) {
      try {
        // Construye la URL con el parámetro 'id'
        const url = `https://trabajarsaltaback.vercel.app/getchats/${id}`;
  
        // Realiza la solicitud GET con la URL construida
        const response = await axios.get(url);
        console.log(id);
        console.log(response.data);
  
        return dispatch({
          type: GET_CHATS,
          payload: response.data,
        });
      } catch (error) {
        // Maneja errores
      }
    };
  }

  export const getmyprivatechat = (payload) => {

    return async function (dispatch) {
      try {
      console.log(payload);
        const response = await axios.post("https://trabajarsaltaback.vercel.app/getmessage", payload)
        
        console.log(response);
        
        return dispatch({
          type: GET_MY_PRIVATE_CHAT,
          payload: response.data,
        });
 
      } catch (error) {
        // Error en la petición
        console.error(error);
        return { success: false, message: "Error de creacion de comentario" };
      }
    };
    
  };

  export const getcandidates = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get("https://trabajarsaltaback.vercel.app/getcandidates");
  
        return dispatch({
          type: GET_CANDIDATES,
          payload: json.data,
        });
      } catch (error) {
       
      }
    };
  };