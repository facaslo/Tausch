import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Activation from './routes/activation';
import Datos from './routes/datos';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>   
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/activacion" element={<Activation/>} />
        <Route path="/datos/:email" element={<Datos />}/>       
        {/* <Route path="/inicio"element={<Inicio />}/> */}
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


