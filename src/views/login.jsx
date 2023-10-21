import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { app } from '../firebase';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

import Swal from 'sweetalert2';
import { register_google } from '../redux/Actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          title: 'Usuario bloqueado',
          icon: 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'bg-orange-600 text-white rounded-md px-4 py-2',
          },
        });
      } else {
        navigate('/form');
        localStorage.setItem('id', response._id);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <h1 className="text-4xl font-bold text-center mb-4">Trabajar Salta</h1>
      <p className="text-xl text-center mb-4">Trabajo 100% seguro con regulación de salarios</p>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-3 px-6 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
      >
        <FaGoogle className="text-2xl" />
        <span>Iniciar sesión con Google</span>
      </button>
      <p className="mt-4">Inicia sesión para crear tu anuncio.</p>
    </div>
  );
}

export default Login;
