import React from "react";
import NavBarPerfil from "../components/NavBar/NavBarPerfil";
import { FaFacebook, FaInstagramSquare, FaTwitter, FaUserEdit } from "react-icons/fa";

export default function ContentPerfil () {
    return(
        <>
            <NavBarPerfil/>
            <div className="general-container">
                <div className="card">
                    <div className="card-body p-4">
                        <h1 className="card-title">Tu perfil</h1><hr />
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    <h4>Tu información</h4>
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">
                                        <div className="card-group">  
                                            <div className="card border-light d-block my-auto">
                                                <div className="card-body">
                                                    <img className="rounded-circle shadow img-fluid rounded-start" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"  />
                                                </div>
                                            </div>
                                            <div className="card border-light d-block my-auto">
                                                <div className="card-body">
                                                    <h5 className="pt-3"><strong>Nombre de usuario</strong></h5>
                                                    <h6>Correo de usuario</h6>
                                                    <h6>Fecha de registro</h6>
                                                    <h6>Puntuación</h6>
                                                </div>
                                            </div>
                                            <div className="card border-light d-block my-auto">
                                                <div className="card-body">
                                                    <h5 className="card-title">Información de contacto</h5>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1"><FaFacebook size={20}/></span>
                                                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1"><FaInstagramSquare size={20}/></span>
                                                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1"><FaTwitter size={20}/></span>
                                                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                        <h4>Tus publicaciones</h4>
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                    <div class="accordion-body">
                                        <strong>Publicaciones que has realizado.</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
    