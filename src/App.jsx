
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

function App() {
  const location = useLocation();
  
  return (
    
    <div className="App">
    {location.pathname !== "/login" && <Navbar />}
       <Routes>
       <Route path="/mymessages" element={<MyMessages/>} />
       <Route path="/form-candidato" element={<Candidato/>} />
       <Route path="/contrata" element={<Contrata/>} />
       <Route path="/" element={<Home/>} />
       <Route path="/about" element={<About/>} />
       <Route path="/form" element={<Form/>} />
       <Route path="/login" element={<Login/>} />
     </Routes>
   </div>
 
  );
}

export default App;
