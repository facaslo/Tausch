import React, { useState, useEffect} from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitter,  FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function ContactInformation (parameters) {
    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
   
    const [datos, setDatos] = useState({});
    

    //Verificar si la token esta activa Con la funcion authorization
    //Y asi saber si hay alguien loggeado y extraer el correo de esa persona
    

    const requestContactInfo=async(email)=>{
        const url="http://localhost:3080/get-profile/";
        return await fetch(url,{            
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ email: email })         
        })
        .then((response) => response.json()).catch(error=> console.log(error));
    }
    
    useEffect(() => {
        (async () => {
            
            let respuesta = await requestContactInfo(parameters.email);
            console.log(respuesta)
            setDatos(respuesta.perfilInfo[0])
            
        })();
    },[]);


    return(
        <>
            <div className="general-container">
                <div className="card border-light d-block my-auto">
                    <div className="card-body">
                        <h5 className="card-title">Información de contacto de {datos.nombres} {datos.apellidos}</h5>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FaPhoneAlt size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.celular} aria-label="Celular" aria-describedby="basic-addon1" keyfilter={/^\d{0,10}$/} disabled="true"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2"><FaFacebook size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.facebook} aria-label="Facebook" aria-describedby="basic-addon2" disabled="true"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon3"><FaInstagramSquare size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.instagram} aria-label="Instagram" aria-describedby="basic-addon3" disabled="true"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon4"><FaTwitter size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.twitter} aria-label="Twitter" aria-describedby="basic-addon4" disabled="true"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon4"><FaEnvelope size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.email} aria-label="Correo" aria-describedby="basic-addon4" disabled="true"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactInformation