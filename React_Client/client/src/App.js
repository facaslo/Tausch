
/*
import React, { Component } from 'react';
import { Image } from 'primereact/image';
import './App.css';
import TabViewDemo from "./TabViewDemo";

function App () {
  return (
    <div className="App">
    <header className="App-header">
      <div>
        <Image src="images/LogoTausch.png" alt="Logo" width="200" />
      </div>
    </header>
    <body>
      <div><TabViewDemo /></div>
      
      
    </body>
  </div>
      
    );
}
*/

import React from 'react';
import './App.css';

import Main from './components/Main';

function App () {
  return (
    <div className='page-container'>
      <div className='content-wrap'>
      
        <Main>

        </Main>

        
      </div>
    </div>
  );
}

export default App;
