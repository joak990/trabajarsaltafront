import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postjob } from '../redux/Actions';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';
function Form() {
 
  useEffect(() => {
    // Verificar si hay un 'id' en el localStorage
    const userId = localStorage.getItem('id');
    if (userId) {
      setForm({ ...form, user: userId });
    }
  }, []);
  const [form, setForm] = useState({
    user: '', // Cambiar esto si es necesario
    content: '',
    phone: '',
    salary: '',
  });
  const [salaryError, setSalaryError] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');
  const [errors, setErrors] = useState('');
  const [caracteresEscritos, setCaracteresEscritos] = useState(0);
  const limiteCaracteres = 450;
  const limiteEmailTelefono = 22;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validarFormulario = () => {
    let isValid = true;

    if (form.content.trim() === '') {
      setErrorMensaje('El mensaje es requerido');
      isValid = false;
    } else if (form.content.trim().length > limiteCaracteres) {
      setErrorMensaje('El mensaje no puede superar los 450 caracteres');
      isValid = false;
    } else {
      setErrorMensaje('');
    }

    if (form.phone.trim() === '') {
      setErrors('El teléfono de contacto es requerido');
      isValid = false;
    } else if (form.phone.trim().length > limiteEmailTelefono) {
      setErrors('El teléfono  de contacto no puede superar los 22 caracteres');
      isValid = false;
    } else {
      setErrors('');
    }

    if (form.salary.trim() === '') {
      setSalaryError('El salario es requerido');
      isValid = false;
    } else {
      setSalaryError('');
    }

    return isValid;
  };

  const salaryRanges = [
    '$1000 - $2000',
    '$3000 - $5000',
    '$7000 - $10000',
  ];

  const handleMensajeChange = (e) => {
    const mensaje = e.target.value;
    if (mensaje.length <= limiteCaracteres) {
      setForm({ ...form, content: mensaje });
      setCaracteresEscritos(mensaje.length);
    }
  };

  const handleEmailTelefonoChange = (e) => {
    const value = e.target.value;
    if (value.length <= limiteEmailTelefono) {
      setForm({ ...form, phone: value });
    }
  };

  const handleSalaryChange = (e) => {
    const salaryValue = e.target.value;
    setForm({ ...form, salary: salaryValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validarFormulario();

    if (isValid) {
      // Verificar si hay un 'id' en el localStorage
      if (!localStorage.getItem('id')) {
        // Mostrar una alerta SweetAlert2 y detener el envío del formulario
        Swal.fire({
          icon: 'error',
          title: 'Inicia sesión para generar un anuncio',
          showCancelButton: true,
          confirmButtonText: 'Ir al login',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login'); // Redirigir al usuario al login
          }
        });
      } else {
        // Si hay un 'id' en el localStorage, enviar el formulario
        dispatch(postjob(form));
      
      }
    }
  };
  

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-mono font-bold text-center mt-8 mb-4">
          ¡Buscas Personal? ¡Completa el formulario es gratis! 💼👨‍💼
        </h1>
        <h2 className='font-semibold font-sans'>Nuestros anuncios duran 24hs y luego se borran instantaneamente</h2>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="mensaje" className="block font-bold mb-2  font-serif">
              Aviso Laboral <span className='text-red-500 text-sm '>*obligatorio</span>
            </label>
            <textarea
              name="content"
              id="content"
              value={form.content}
              onChange={handleMensajeChange}
              className={`w-full h-32 border rounded-md py-2 px-3 ${errorMensaje && 'border-red-500'}`}
            ></textarea>
            {errorMensaje && <p className="text-red-500">{errorMensaje}</p>}
            <p className="text-sm font-sans text-gray-500">
              Caracteres escritos {caracteresEscritos}/{limiteCaracteres}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="telefono" className="block font-bold mb-2 font-serif">
              Teléfono de contacto <span className='text-red-500 text-sm'>*obligatorio</span>
            </label>
            <PhoneInput
              international
              defaultCountry="AR"
              name="phone"
              value={form.phone}
              onChange={(value) => setForm({ ...form, phone: value })}
              className={`w-full border rounded-md py-2 px-3 ${salaryError && 'border-red-500'}`}
            />
            {errors && <p className="text-red-500">{errors}</p>}
            <p className="text-sm font-sans text-gray-500">
              Caracteres escritos: {form.phone.length}/{limiteEmailTelefono}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block font-bold mb-2  font-serif">
          Expectativa Salarial <span className='text-red-500 text-sm'>*obligatorio</span>
            </label>
            <select
        name="salary"
        id="salary"
        value={form.salary}
        onChange={handleSalaryChange}
        className={`w-full  font-serif border rounded-md py-2 px-3 ${salaryError && 'border-red-500'}`}
      >
        <option value="">Seleccione un rango</option>
        {salaryRanges.map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </select>
            {salaryError && <p className="text-red-500">{salaryError}</p>}
          </div>
          <div className="flex justify-center items-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded text-2xl"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
