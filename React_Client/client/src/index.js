import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Activation from './routes/activation';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Index';
import Who from './pages/Who';
import How from './pages/How';
import Community from './pages/Community';
import Lookfor from './pages/Lookfor';
import CreatePublication from './pages/CreatePublication';
import Header from './components/Header';
import Footer from './components/Footer';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Publication from './Publication';
import ContentPerfil from './pages/ContentPerfil';
import Offer from './pages/Offer'

ReactDOM.render(
    <BrowserRouter>   
        <Header />
        <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/activacion" element={<Activation/>} />    
            {/* <Route path="/inicio"element={<Inicio />}/> */}
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/who' element={<Who />}/>
            <Route exact path='/how' element={<How />}/>
            <Route exact path='/community' element={<Community />}/>
            <Route exact path='/lookfor' element={<Lookfor />}/>
            <Route exact path='/createpublication' element={<CreatePublication />}/>
            <Route exact path='/publication/:id' element={<Publication />}/>
            <Route exact path='/contentperfil' element={<ContentPerfil />}/>
            <Route exact path='/offer/:id' element={<Offer />}/>

        </Routes>
        <Footer />
    </BrowserRouter>,
    document.getElementById('root')
)



/*

import React, { Component } from 'react';
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
        {/* <Route path="/inicio"element={<Inicio />}/> */  /*}
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
)

*/





