import axios from 'axios'
import { GET_ALL_POST, GET_CANDIDATES } from './types';
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