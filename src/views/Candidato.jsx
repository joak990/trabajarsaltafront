import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { candidatecreate, postjob } from '../redux/Actions';
import Swal from 'sweetalert2';
import PhoneInput from 'react-phone-number-input';
import backgroundImg from '../assets/banner-images/candidato.jpg'
import 'react-phone-number-input/style.css';
function Candidato() {
  const user = localStorage.getItem("id")
  console.log();
  const [form, setForm] = useState({
    user: user,
    name: '',
    city: '',
    description: '',
    phone: '',
    sector: '',
   
    salary: '',
    
     // Agrega un nuevo estado para el enlace del PDF
  });
  const backgroundStyle = {
    background: `url(${backgroundImg}) center/cover no-repeat`,
    minHeight: '100vh', 
    filter: 'brightness(0.9)'// Ajusta la altura según tus necesidades
  };

  const [errorMensaje, setErrorMensaje] = useState('');
  const [errors, setErrors] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [caracteresEscritos, setCaracteresEscritos] = useState(0);
  const limiteCaracteres = 60;
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
    const file = e.target.files[0];
    if (file) {
      // Aquí puedes realizar validaciones adicionales si es necesario
      setForm({ ...form, curriculum: file });
    } else {
      setForm({ ...form, curriculum: null });
    }
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
        const formData = new FormData();

        formData.append('user', form.user);
        formData.append('name', form.name);
        formData.append('city', form.city);
        formData.append('description', form.description);
        formData.append('sector', form.sector);
        formData.append('curriculum', form.curriculum);
        formData.append('phone', form.phone);
        formData.append('salary', form.salary);

        dispatch(candidatecreate(form));
        console.log(formData);
        setForm({
         
          name: '',
          city: 'Salta Capital',
          description: '',
          curriculum: null,
          phone: '',
          salary: '',
          
        });
      }
    }
  };
  

  return (
<div className="min-h-screen" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover' }}>
      <div className="p-2">
        <h1 className="text-2xl bg-black text-white font-bold font-mono text-center mt-8 mb-4">
         ¡¿Buscas trabajo? ¡Completa el formulario  es gratis! 💼👨‍💼
        </h1>
        <div className='flex justify-center'>
        <h2 className="text-sm bg-black text-white font-bold font-mono  mt-8 mb-4">
        Automaticamente se publicara en la sección de "Encuentra Candidatos"
        </h2>
       
        </div>
        <div className='flex justify-center'>
        <h2 className="text-sm bg-black text-white font-bold font-mono  mt-8 mb-4">
       Tus publicaciones como candidato duran 24hs luego podras volver a publicar
        </h2>
        </div>
       
        <div className='w-full'>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className=" w-full md:max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">

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
<label htmlFor="sector" className="block  font-serif font-bold mb-2">
Ciudad <span className="text-red-500 text-sm">*</span>
</label>
<select
name="city"
value={form.city}
onChange={(e) => setForm({ ...form, city: e.target.value })}
className="w-full  font-serif border rounded-md py-2 px-3"
>
<option value="">Selecciona tu ciudad</option>
<option value="Salta Capital">Salta Capital</option>

</select>
  {errors && <p className="text-red-500">{errors}</p>}

</div>
<div className="mb-4">
  <label htmlFor="description" className="block   font-serif font-bold mb-2">
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
<label htmlFor="sector" className="block  font-serif font-bold mb-2">
Elige tu sector <span className="text-red-500 text-sm">*</span>
</label>
<select
name="sector"
value={form.sector}
onChange={(e) => setForm({ ...form, sector: e.target.value })}
className="w-full  font-serif border rounded-md py-2 px-3"
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
  <label htmlFor="phone" className="block  font-serif font-bold mb-2">
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
    className="bg-blue-500   font-serif hover-bg-blue-600 text-white font-bold py-2 px-4 rounded text-2xl"
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
    </div>
  );
}

export default Candidato;
