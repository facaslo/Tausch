import React, {useState,useEffect} from "react";
import { FaBell } from "react-icons/fa";
import "./NavBarPerfil.css"

export default function NavBarPerfil () {

    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [isAuthenticated, setisAuthenticated] = useState(false);

    //Estado para saber el nombre del usuario si hay un usuario autenticado
    const [nombreDeUsuario, setnombreDeUsuario] = useState('');

    //Estado para saber la cantidad de propuestas "en espera del usuario"
    const [cantidadPropuestas, setCantidadPropuestas] = useState(0);

    //Estado para almacenar las propuestas dentro de una lista
    const [propuestas, setPropuestas] = useState([]);

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
                const userData = await fetch("http://localhost:3080/authentication/getUserInfo",
                {
                    method:"GET",
                    headers:{token: localStorage.token}
                });

                const userDataJson = await userData.json();
                
                //Almacena el nombre de usuario
                setnombreDeUsuario(userDataJson[0].nombre_de_usuario);

                //Recuperar los datos de las propuestas que ha recibido
                //El usuario actualmente loggeado
                const proposalData = await fetch("http://localhost:3080/offers-to-user",
                {
                    method:"GET",
                    headers:{token: localStorage.token}
                });

                const proposalDataJson = await proposalData.json();
                
                //Almacena la cantidad de propuestas recibidas
                setCantidadPropuestas(proposalDataJson.offers.length);

                //Almacenar las propuestas recibidas en una lista temporal para luego
                //asignarselas al estado para que puedan ser dibujadas en el dropdown
                let listaTemporal = [];
                for(const prop of proposalDataJson.offers){
                    listaTemporal.push(prop);
                }
                setPropuestas(listaTemporal);

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
            <div className={isAuthenticated ? "":"no-display"}>
                <nav className="nav nav-pills nav-justified text-dark bg-white d-flex justify-content-around border border-primary rounded">
                    <h3 className="align-middle p-3 mb-2 font-italic">Bienvenido {nombreDeUsuario}</h3>
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaBell size={25}/> 
                        <span id="notification" className="badge badge-light">{cantidadPropuestas}</span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {cantidadPropuestas ?  
                                //Si la cantidad de propuestas es diferente de cero, las imprime
                                propuestas.map((item) => {
                                return(
                                    <li class="dropdown-item">Tienes una propuesta de <i>{item.nombre_de_usuario}</i> por tu producto: {item.titulo}</li>
                                )})
                                :
                                //Si la cantidad de propuestas es igual a cero imprime este mensaje
                                <li class="dropdown-item">No has recibido ninguna propuesta de trueque</li>
                            }
                            
                        </ul>
                    </div>
                    {/*<button type="button" class="btn btn-primary">
                        <FaBell size={25}/> <span id="notification" className="badge badge-light">7</span>
                    </button>*/}
                    {/*<button className="btn btn-success font-weight-bold">Click notif</button>*/}
                </nav>
            </div>
        </>
    )
}