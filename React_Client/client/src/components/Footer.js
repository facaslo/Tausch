import React from "react";
import './Content.css'

const Footer = () => {
    return(
        <footer className="text-center footer-style">
            <div className="main-footer">
                <div className="row">
                    {/*Column 1 */}
                    <div className="col-md-4 footer-col">
                        <h4>Tausch</h4>
                            <p>
                                Bogotá <br />
                                Colombia
                            </p>
                    </div>
                    {/*Column 2 */}
                    <div className="col-md-4 footer-col">
                        <h4>Stuff</h4>
                        <ul className="list">
                            <li>Fabián Castro</li>
                            <li>Santiago Rodríguez</li>
                            <li>Yuli Beltrán</li>
                            <li>Julio Bedoya</li>
                            <li>Santiago Cassiano</li>
                        </ul>
                    </div>
                    <div className="row">
                        <p className="col-md-4 footer-col">
                            &copy;{new Date().getFullYear()}
                            Tausch | Todos los derechos reservados | Términos del servicio
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        
    );
}

export default Footer