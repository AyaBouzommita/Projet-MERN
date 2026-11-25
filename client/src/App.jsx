import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbarr from './components/Navbarr';
import { useEffect } from 'react';
import { getusers } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import { getproducts } from './redux/productSlice';

function App() {
  const [ping, setping] = useState(false)
  const dispatch=useDispatch();
useEffect(() => {
    dispatch(getusers());
    dispatch(getproducts())
}, [ping])


  return (
  <div>
    <Navbarr/>
    <Routes>
        <Route path="/" element={ <Home ping={ping} setping={setping}/> } />
        <Route path="/about" element={ <About/> } />
        <Route path="/contact" element={ <Contact/> } />
      </Routes>
  </div>
  )
}

export default App
