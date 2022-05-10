import React, { Component } from "react";
import Modal from "../Modal";
import { Button } from "../Button"
import { MenuItems } from "./MenuItems"
import ReactFinalFormDemo  from '../../FormularioRegistro';
import ReactFormLogin  from '../../FormularioLogin';
import { NavLink } from "react-router-dom";
import { Image } from 'primereact/image';

import "./NavBar.css"

class NavBar extends Component {
    state = [{ clicked : false}, { estadoModal1 : false}, { estadoModal2 : false}, {name: ''}]

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    cambiarEstadoModal1 = () => {
        this.setState({ estadoModal1: !this.state.estadoModal1})
    }

    cambiarEstadoModal2 = () => {
        this.setState({ estadoModal2: !this.state.estadoModal2})
    }

    //Para hacer logout eliminar la token
    //y redirigirlo a la pantalla de home
    logout = (e) => {
        localStorage.removeItem("token");
        console.log("log out exitoso")
        window.location.replace("/");
    }

    render() {
        return (
            <div>
                <nav className="NavBarItems">
                    <h1>
                    <Image src="images/LogoT2.png" alt="logot2" width="70px" />  
                        {/*Tausch
                        <h6 className="navbar-slogan">Tu llave a lo que buscas</h6> */}
                    </h1>
                    
                    <div className={this.props.isAuthenticated ? "no-display-login":""}>
                        <Button onClick={(this.cambiarEstadoModal2)}>
                            Inicia Sesión
                        </Button>
                        <Modal className="contenido-modal" estado={this.state.estadoModal2} cambiarEstado={this.cambiarEstadoModal2}>
                            <ReactFormLogin />
                        </Modal>
                        <Button onClick={(this.cambiarEstadoModal1)}>
                            Regístrate gratis
                        </Button>
                        <Modal className="contenido-modal" estado={this.state.estadoModal1} cambiarEstado={this.cambiarEstadoModal1}>
                            <ReactFinalFormDemo />
                        </Modal>
                    </div>
                    <div className={this.props.isAuthenticated ? "":"no-display-login"}>
                        <h6 className="mensaje-bienvenida">Bienvenido {this.props.nombreDeUsuario}</h6>
                        <Button>
                            Crear Publicación
                        </Button>
                        <Button onClick={e => this.logout(e)}>
                            Cerrar Sesión
                        </Button>
                    </div>

                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'pi pi-times' : 'pi pi-bars'}></i>                  
                    </div>
                    <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                        {MenuItems.map((item, index) => {
                                return (
                                    <li key = {index}>
                                        <NavLink to = {item.to} className = {item.cName} onClick={this.handleClick}>
                                            {item.tittle}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }                  
                    </ul>
                </nav>
            </div>
            
             
        )
    }
}

export default NavBar