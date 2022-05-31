import React, {useState,useEffect} from "react";
import NavBarPerfil from "../components/NavBar/NavBarPerfil";
import { FaFacebook, FaInstagramSquare, FaTwitter, FaUserEdit, FaPhoneAlt } from "react-icons/fa";

export default function ContentPerfil () {
    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [userEmail, setUserEmail]=useState(null);
    const [datos, setDatos] = useState({});

    //Verificar si la token esta activa Con la funcion authorization
    //Y asi saber si hay alguien loggeado y extraer el correo de esa persona
    async function isAuth(emailDueñoPublicacion){
        try{
            const response = await fetch("http://localhost:3080/authentication/is-verify",
            {
                method:"GET",
                headers:{token: localStorage.token}
            });

            //Retorna True si se tiene token valida
            const parseRes = await response.json();

            //Si es true, es que hay una token activa, entonces esta autenticado
            parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
            
            if (parseRes == true){
                //Si hay alguien autenticado,
                //entonces buscar su nombre_de_usuario
                const userData = await fetch("http://localhost:3080/authentication/getProfileInfo",
                {
                    method:"GET",
                    headers:{token: localStorage.token}
                });

                const userDataJson = await userData.json();
                setDatos(userDataJson[0]);
            }
        } catch(err){
            console.error(err.message);
        }
    }

    useEffect(() => {
        (async () => {
            isAuth();
        })();
    },[]);





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
                                                    <h5 className="pt-3"><strong>{datos.nombres} {datos.apellidos}</strong></h5>
                                                    <h6>{datos.email}</h6>
                                                    <h6>{String(datos.fecha_de_registro).slice(0,10)}</h6>
                                                    <h6>Puntuación</h6>
                                                </div>
                                            </div>
                                            <div className="card border-light d-block my-auto">
                                                <div className="card-body">
                                                    <h5 className="card-title">Información de contacto</h5>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1"><FaPhoneAlt size={20}/></span>
                                                        <input type="text" class="form-control" placeholder={datos.celular} aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1"><FaFacebook size={20}/></span>
                                                        <input type="text" class="form-control" placeholder={datos.facebook} aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1"><FaInstagramSquare size={20}/></span>
                                                        <input type="text" class="form-control" placeholder={datos.instagram} aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1"><FaTwitter size={20}/></span>
                                                        <input type="text" class="form-control" placeholder={datos.twitter} aria-label="Username" aria-describedby="basic-addon1" />
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
    