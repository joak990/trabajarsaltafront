
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './Components/Navbar';
import About from './views/About';
import Form from './views/Form';
import Login from './views/login';

function App() {
  const location = useLocation();
  
  return (
    
    <div className="App">
    {location.pathname !== "/login" && <Navbar />}
       <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/about" element={<About/>} />
       <Route path="/form" element={<Form/>} />
       <Route path="/login" element={<Login/>} />
     </Routes>
   </div>
 
  );
}

export default App;
