
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './Components/Navbar';
import About from './views/About';
import Form from './views/Form';
import Login from './views/login';

function App() {
  return (
    <div className="App">
      <Navbar/>
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
