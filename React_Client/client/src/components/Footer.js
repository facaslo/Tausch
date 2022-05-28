import React from "react";
import './Content.css'

const Footer = () => {
    return(
        <footer className="text-center footer-style">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <div className="container">
                <div className="row">
                    <h1 className="footer-logo">Tausch</h1>
                    <div className="main-footer">
                        <ul className="list">
                            <li>Bogotá</li>
                            <li>Colombia</li>
                        </ul>
                    </div>
                    <div className="main-footer">
                        <ul className="list">
                            <h2>Stuff</h2>
                            <li>Fabián Castro</li>
                            <li>Santiago Rodríguez</li>
                            <li>Yuli Beltrán</li>
                            <li>Julio Bedoya</li>
                            <li>Santiago Cassiano</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <hr />
                    <p className="main-footer">
                        &copy;{new Date().getFullYear()}
                        Tausch | Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
        
    );
}

export default Footer