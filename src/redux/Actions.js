import axios from 'axios'
import { GET_ALL_POST } from './types';
export const postjob = (payload) => {

    return async function () {
      try {
      console.log(payload);
        const response = await axios.post("https://trabajarsaltaback.vercel.app/createpost", payload)
        
        console.log(response);
  
      } catch (error) {
        // Error en la petición
        console.error(error);
        return { success: false, message: "Error de creacion de comentario" };
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
  