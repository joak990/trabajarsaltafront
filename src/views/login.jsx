import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import logo from "./logo salta emplea.jpg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import videoBackground from "../assets/banner-images/saltaarg.mp4"; // Ruta al archivo de video

import Swal from "sweetalert2";
import { register_google } from "../redux/Actions";

function Home() {
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
          title: "Usuario bloqueado",
          icon: "error",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
          },
        });
      } else {
        Swal.fire({
          title: "Sesión Iniciada",
          icon: "success",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-orange-600 text-white rounded-md px-4 py-2",
          },
        });
        navigate("/");
        localStorage.setItem("id", response._id);
        localStorage.setItem("name", response.name);
      }
    });
  }

  return (
    <div className="flex h-screen  md:flex-row ">
      <div className="w-full md:w-1/2 relative hidden md:block"> {/* Ocultar en dispositivos móviles */}
        <video autoPlay muted loop className="w-full md:h-full object-cover absolute inset-0 z-10">
          <source src={videoBackground} type="video/mp4" />
          {/* Agrega más formatos de video si es necesario */}
        </video>
        <div className="absolute inset-0 bg-black opacity-30 z-20" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 text-center bg-slate-900">
        <div className="flex justify-center mb-4 md:mb-20">
          <img className="rounded-full h-24 md:h-44" src={logo} alt="" />
        </div>
        <p className="text-xl text-white font-semibold mb-4">
          El portal de empleo de todos los salteños
        </p>
        <p className="text-white font-semibold">
          Inicia sesión para promocionarte como candidato o publicar tu oferta
          laboral.
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogin}
            className="bg-white text-black w-full h-12 py-3 px-6 rounded-lg flex items-center space-x-2 text-center"
          >
            <FcGoogle size={40} className="text-2xl" />
            <span> Iniciar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
