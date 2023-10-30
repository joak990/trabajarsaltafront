
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './Components/Navbar';
import About from './views/About';
import Form from './views/Form';
import Login from './views/login';
import Contrata from './views/Contrata';
import Candidato from './views/Candidato';
import MyMessages from './views/MyMessages';
import { useIdleTimer } from 'react-idle-timer/legacy'
import { useEffect, useState } from 'react';
import { setActiveState } from './redux/Actions';
import { useDispatch } from 'react-redux';


function App() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(true);
const dispatch = useDispatch()
  const handleOnIdle = (event) => {
    console.log('Usuario inactivo');
    dispatch(setActiveState(false))
  };

  const handleOnActive = (event) => {
    console.log('Usuario activo');
    dispatch(setActiveState(true))
  };

  useEffect(() => {
    setIsActive(true);
  }, []);
  const { reset, pause, resume } = useIdleTimer({
    timeout: 4000, // 1 minuto en milisegundos
    onIdle: handleOnIdle,
    onActive: handleOnActive,
  });
  

  // Luego, puedes usar isActive en tu componente para mostrar información según el estado del usuario
  return (
    <div className="App">
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/mymessages" element={<MyMessages />} />
        <Route path="/form-candidato" element={<Candidato />} />
        <Route path="/contrata" element={<Contrata />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
      </Routes>
   
      
    </div>
  );
}

export default App;
