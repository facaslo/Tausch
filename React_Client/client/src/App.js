import React from 'react';
//import logo from './logo.svg';
import './App.css';
import TabViewDemo from './TabViewDemo.js';

//const ReactFinalFormDemo = React.lazy(() => import('./FormularioRegistro'));

function App() {
  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Tausch</h1>
          <p>"Tu llave a lo que buscas"</p>
        </div>
      </header>
      <body>
        <div><TabViewDemo /></div>
        
        
      </body>
    </div>
  );

}


export default App;
