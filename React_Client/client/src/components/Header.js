import React from "react";
import { Image } from 'primereact/image';
import NavBar from "./NavBar/NavBar.js"
import "./Content.css"

const Header = () => {
    return(
        <div>
            <div className="header-logo">
                <div className="imag">
                <Image src="images/LogoT2.png" alt="logot2" width="80%"/>
                </div>
            </div>
            <header>
                <NavBar />
            </header>
        </div>
    );
}

export default Header