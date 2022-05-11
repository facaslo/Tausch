import { Image } from 'primereact/image';
import React, {useState,useEffect} from "react";
import NavBar from "./NavBar/NavBar.js"
import "./Content.css"

const Header = () => {
    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [isAuthenticated, setisAuthenticated] = useState(false);

    //Estado para saber el nombre del usuario si hay un usuario autenticado
    const [nombreDeUsuario, setnombreDeUsuario] = useState('');

    //Verificar si la token esta activa
    //Con la funcion authorization
    //Y asi saber si hay alguien loggeado y 
    //Extraer el nombre_de_usuario de esa persona
    async function isAuth(){
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
                const userData = await fetch("http://localhost:3080/authentication/getUserInfo",
                {
                    method:"GET",
                    headers:{token: localStorage.token}
                });

                const userDataJson = await userData.json();
                //Almacena el nombre de usuario
                setnombreDeUsuario(userDataJson[0].nombre_de_usuario);

            }
        } catch(err){
            console.error(err.message);
        }
    }

    useEffect(() => {
        isAuth();
    },[]);



    return(
        <div>
            <div className="header-logo">
                <div className="imag">
                <Image src="images/LogoT2.png" alt="logot2" width="80%"/>
                </div>
            </div>
            <header>
                <NavBar isAuthenticated={isAuthenticated} nombreDeUsuario={nombreDeUsuario}/>
            </header>
        </div>
    );
}

export default Header