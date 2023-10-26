import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { candidatecreate, postjob } from '../redux/Actions';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';
function Candidato() {
  const user = localStorage.getItem("id")
  console.log();
  const [form, setForm] = useState({
    user: user,
    name: '',
    city: '',
    description: '',
    curriculum: null,
    phone: '',
    salary: '',
    sector: ''
     // Agrega un nuevo estado para el enlace del PDF
  });

  const [errorMensaje, setErrorMensaje] = useState('');
  const [errors, setErrors] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [caracteresEscritos, setCaracteresEscritos] = useState(0);
  const limiteCaracteres = 150;
  const limiteEmailTelefono = 22;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validarFormulario = () => {
    let isValid = true;

    if (form.name.trim() === '') {
      setErrorMensaje('El nombre es requerido');
      isValid = false;
    } else {
      setErrorMensaje('');
    }

    if (form.city.trim() === '') {
      setErrors('La ciudad es requerida');
      isValid = false;
    } else if (form.city.trim().length > limiteEmailTelefono) {
      setErrors('La ciudad no puede superar los 22 caracteres');
      isValid = false;
    } else {
      setErrors('');
    }

    if (form.description.trim() === '') {
      setSalaryError('La descripción es requerida');
      isValid = false;
    } else {
      setSalaryError('');
    }

    if (form.curriculum === null) {
      setSalaryError('El archivo PDF del currículum es requerido');
      isValid = false;
    } else {
      setSalaryError('');
    }

    if (form.phone.trim() === '') {
      setSalaryError('El teléfono de contacto es requerido');
      isValid = false;
    } else if (form.phone.trim().length > limiteEmailTelefono) {
      setSalaryError('El teléfono de contacto no puede superar los 22 caracteres');
      isValid = false;
    } else {
      setSalaryError('');
    }

    return isValid;
  };

  const handleMensajeChange = (e) => {
    const mensaje = e.target.value;
    if (mensaje.length <= limiteCaracteres) {
      setForm({ ...form, description: mensaje });
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

  const handleFileChange = (e) => {
    const value = e.target.value;
   
    setForm({ ...form, curriculum: value });
;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validarFormulario();

    if (isValid) {
      if (!localStorage.getItem('id')) {
        Swal.fire({
          icon: 'error',
          title: 'Inicia sesión para generar un anuncio',
          showCancelButton: true,
          confirmButtonText: 'Ir al login',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      } else {
        dispatch(candidatecreate(form));
        setForm({
         
          name: '',
          city: '',
          description: '',
          curriculum: null,
          phone: '',
          salary: '',
           // Agrega un nuevo estado para el enlace del PDF
        });
      }
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mt-8 mb-4">
          ¡¿Quieres ser visible en nuestra plataforma? ¿Buscas trabajo? ¡Completa el formulario, es gratis! 💼👨‍💼
        </h1>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Nombre <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full border rounded-md py-2 px-3 ${errorMensaje && 'border-red-500'}`}
            />
            {errorMensaje && <p className="text-red-500">{errorMensaje}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block font-bold mb-2">
              Ciudad <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className={`w-full border rounded-md py-2 px-3 ${errors && 'border-red-500'}`}
            />
            {errors && <p className="text-red-500">{errors}</p>}
            <p className="text-sm text-gray-500">
              Caracteres escritos: {form.city.length}/{limiteEmailTelefono}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
           Cuentanos mas sobre ti <span className="text-red-500 text-sm">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleMensajeChange}
              className={`w-full border rounded-md py-2 px-3 ${salaryError && 'border-red-500'}`}
            />
              <p className="text-sm text-gray-500">
              Caracteres escritos: {form.description.length}/{limiteCaracteres}
            </p>
            {salaryError && <p className="text-red-500">{salaryError}</p>}
          </div>
          <div className="mb-4">
  <label htmlFor="sector" className="block font-bold mb-2">
    Elige tu sector <span className="text-red-500 text-sm">*</span>
  </label>
  <select
    name="sector"
    value={form.sector}
    onChange={(e) => setForm({ ...form, sector: e.target.value })}
    className="w-full border rounded-md py-2 px-3"
  >
    <option value="">Selecciona tu sector</option>
    <option value="Comercio">Comercio</option>
    <option value="Construcción">Construcción</option>
    <option value="Educación">Educación</option>
    <option value="Hotelería">Hotelería</option>
    <option value="Agricultura">Agricultura</option>
  </select>
</div>
          <div className="mb-4">
            <label htmlFor="curriculum" className="block font-bold mb-2">
              Link de tu curriculum en la nube  <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="text"
           value={form.curriculum}
              name="curriculum"
              onChange={handleFileChange}
              className={`w-full border rounded-md py-2 px-3 ${salaryError && 'border-red-500'}`}
            />
            {salaryError && <p className="text-red-500">{salaryError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-bold mb-2">
              Teléfono de contacto <span className="text-red-500 text-sm">*</span>
            </label>
            <PhoneInput
              international
              defaultCountry="AR"
              name="phone"
              value={form.phone}
              onChange={(value) => setForm({ ...form, phone: value })}
              className={`w-full border rounded-md py-2 px-3 ${salaryError && 'border-red-500'}`}
            />
            {salaryError && <p className="text-red-500">{salaryError}</p>}
            <p className="text-sm text-gray-500">
              Caracteres escritos: {form.phone.length}/{limiteEmailTelefono}
            </p>
          </div>
          <div className="flex justify-center items-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded text-2xl"
            >
              Enviar
            </button>
          </div>
          {form.pdfLink && ( // Mostrar el enlace del PDF si está disponible
            <div className="mb-4">
              <p>Enlace al currículum:</p>
              <a href={form.pdfLink} target="_blank" rel="noopener noreferrer">
                Ver/Descargar PDF
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Candidato;
