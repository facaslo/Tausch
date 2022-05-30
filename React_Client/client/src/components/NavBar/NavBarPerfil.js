import React from "react";
import { FaBell } from "react-icons/fa";
import "./NavBarPerfil.css"

export default function NavBarPerfil () {
    return(
        <>
            <nav className="nav nav-pills nav-justified text-dark bg-white d-flex justify-content-around border border-primary rounded">
                <h3 className="align-middle p-3 mb-2 font-italic">Bienvenido + nombre de usuario</h3>
                <button type="button" class="btn btn-dark">
                    <FaBell size={25}/> <span id="notification" class="badge badge-light">7</span>
                </button>
                <button className="btn btn-success font-weight-bold">Click notif</button>
            </nav>
        </>
    )
}