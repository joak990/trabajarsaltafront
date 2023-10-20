import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    setPersistence,
    browserSessionPersistence,

  } from "firebase/auth";

import Swal from "sweetalert2";
import { register_google } from '../redux/Actions';
function Login() {
  const navigate = useNavigate();
const dispatch = useDispatch()
const provider = new GoogleAuthProvider();
const firebaseAuth = getAuth(app);
  const handleLogin = async () => {
    await setPersistence(firebaseAuth, browserSessionPersistence);
    const response = await signInWithPopup(firebaseAuth, provider);

    const datauser = {
      name: response.user.displayName,
      email: response.user.email,
      uid: response.user.uid,
    
    };

   
    
    dispatch(register_google(datauser)).then((response) => {
        console.log(response);
      if (response === false) {
        Swal.fire({
          title: "Usuario bloqueado",
          icon: "error",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
          },
        });
      } else {
        navigate("/form");
        localStorage.setItem("id",response._id)
      }
    });
  };
  return (
    <div>
      <h1>Iniciar sesión con Google</h1>
      <button onClick={handleLogin}>
        <FaGoogle /> Iniciar sesión con Google
      </button>
      <p>Para crear anuncios, debes iniciar sesión con Google.</p>
    </div>
  );
}

export default Login;
