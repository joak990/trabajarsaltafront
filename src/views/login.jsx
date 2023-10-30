import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
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
import { register_google } from "../redux/Actions";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const firebaseAuth = getAuth(app);

  const [sphereGradient, setSphereGradient] = useState(
    "linear-gradient(45deg, #FF5733, #33FF57, #5733FF)"
  );
  const gradients = [
    "linear-gradient(45deg, #FF3366, #6633FF, #33FF99)",
    // Agrega más gradientes aquí
  ];

  useEffect(() => {
    let gradientIndex = 0;

    const gradientChangeInterval = setInterval(() => {
      if (gradientIndex >= gradients.length) {
        gradientIndex = 0;
      }
      const currentGradient = gradients[gradientIndex];
      setSphereGradient(currentGradient);
      gradientIndex++;
    }, 2000);

    return () => {
      clearInterval(gradientChangeInterval);
    };
  }, []);

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
        localStorage.setItem("id", response._id);
        localStorage.setItem("name", response.name);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <div className="w-1/2 md:flex md:items-center md:justify-center">
        {/* Esfera animada */}
        <div
          className="w-40 h-40 rounded-full shadow-2xl animate-bounce md:hidden"
          style={{ backgroundImage: sphereGradient }}
        ></div>
      </div>
      <div className="w-1/2 p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Salta Emplea</h1>
        <p className="text-xl font-semibold mb-4">
          Tu plataforma laboral digital en Salta.
        </p>
        <p className="mt-4 font-semibold">
          Inicia sesión para promocionarte como candidato o publicar tu oferta
          laboral.
        </p>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white w-40 py-3 px-6 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
          >
            <FaGoogle className="text-2xl" />
            <span>Iniciar sesión con Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
