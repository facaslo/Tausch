import React, { Component } from "react";
import Modal from "../Modal";
import { Buttonn } from "../Buttonn"
import { MenuItems } from "./MenuItems"
import ReactFinalFormDemo  from '../../FormularioRegistro';
import ReactFormLogin  from '../../FormularioLogin';
import { NavLink } from "react-router-dom";

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
        window.location.replace("/");
    }

    //Funcion para ir al formulario de crear publicación
    goToCreatePublication = (e) => {
        window.location.replace("/createpublication");
    }

    render() {
        return (
            <div>
                <nav className="NavBarItems">
                    {/*<h1>
                    <Image src="images/LogoT2.png" alt="logot2" width="70px" />  
                        Tausch
                        <h6 className="navbar-slogan">Tu llave a lo que buscas</h6>
                    </h1>*/}
                    {/*}
                    <div className={this.props.isAuthenticated ? "no-display-login":""}>
                        <button className='btn btn-info btn-lg me-2' >Arte</button>
                        <Buttonn onClick={(this.cambiarEstadoModal2)}>
                            Inicia Sesión
                        </Buttonn>
                        <Modal className="contenido-modal" estado={this.state.estadoModal2} cambiarEstado={this.cambiarEstadoModal2}>
                            <ReactFormLogin />
                        </Modal>
                        <Buttonn onClick={(this.cambiarEstadoModal1)}>
                            Regístrate gratis
                        </Buttonn>
                        <Modal className="contenido-modal" estado={this.state.estadoModal1} cambiarEstado={this.cambiarEstadoModal1}>
                            <ReactFinalFormDemo />
                        </Modal>
                    </div>*/}
                    <div className="botones">
                        <div className={this.props.isAuthenticated ? "no-display-login":""}>
                            <button className='btn btn-info btn-lg me-2' onClick={(this.cambiarEstadoModal2)}>Inicia Sesión</button>
                            <Modal className="contenido-modal" estado={this.state.estadoModal2} cambiarEstado={this.cambiarEstadoModal2}>
                                <ReactFormLogin />
                            </Modal>
                            <button className='btn btn-info btn-lg me-2' onClick={(this.cambiarEstadoModal1)}>Regístrate gratis</button>
                            <Modal className="contenido-modal" estado={this.state.estadoModal1} cambiarEstado={this.cambiarEstadoModal1}>
                                <ReactFinalFormDemo />
                            </Modal>
                        </div>
                        <div className={this.props.isAuthenticated ? "":"no-display-login"}>
                            <h6 className="mensaje-bienvenida">Bienvenido {this.props.nombreDeUsuario}</h6>
                            <button className='btn btn-info btn-lg me-2' onClick={e => this.goToCreatePublication(e)}>Crear Publicación</button>
                            <button className='btn btn-info btn-lg me-2' onClick={e => this.logout(e)}>Cerrar Sesión</button>
                        </div>
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