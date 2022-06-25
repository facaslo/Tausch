import React, {useState,useEffect} from "react";
import "./NavBarPerfil.css"
import "./notificationBell"
import NotificationBell from "./notificationBell";

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

                //EN ESTE CASO ESPECIAL SI RETORNA UN DATO LA FUNCION ISAUTH
                return true      

            }
            // SI NO HAY NADIE LOGGEADO EN ESTE CASO SI RETORNA LA FUNCION EL DATO
            return false
        } catch(err){
            console.error(err.message);
        }
    }

    async function retrieveNotifications(){
        //Recuperar los datos de las propuestas que ha recibido        
        const proposalData = await fetch("http://localhost:3080/offers-to-user",
        {
            method:"GET",
            headers:{token: localStorage.token}
        });

        const proposalDataJson = await proposalData.json();                
        
        //Almacena la cantidad de propuestas recibidas
        const numeroNotificacionesActivas = proposalDataJson.offers.reduce((acc, row) => {                    
            if (!row.notificacion_abierta){
                return acc + 1;
            }
            return acc;
        }, 0);
        
        setCantidadPropuestas(numeroNotificacionesActivas);               
        //setPropuestas(proposalDataJson.offers);

        //Almacenar las propuestas recibidas en una lista temporal para luego
        //asignarselas al estado para que puedan ser dibujadas en el dropdown
        let listaTemporal = [];
        for(const prop of proposalDataJson.offers){
            listaTemporal.push(prop);
        }
        setPropuestas(listaTemporal);
    }

    const sendDeleteMessagesRequest = async () => {
        const response = await fetch("http://localhost:3080/delete_notifications",
            {
                method:"DELETE",
                headers: {token: localStorage.token}
            });     
        await retrieveNotifications();   
    }

    const openNotification = async (id_propuesta) => {
        const response = await fetch("http://localhost:3080/update_notification",
            {
                method:"PUT",
                headers: {token: localStorage.token, 'Accept': 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({'id_propuesta': id_propuesta})
            });                
        
        window.location.href=`/offer/${id_propuesta}`
    }

    useEffect(() => {
        (async () => {
            //Solo si esta Loggeado entonces si reciba sus notificaciones
            if (await isAuth()){
                await retrieveNotifications();
            }
        })();
    }, []);

    
    return(
        <>
            <div className={isAuthenticated ? "":"no-display"}>
                <nav className="nav nav-pills nav-justified text-dark bg-white d-flex justify-content-around border border-primary rounded">
                    <h3 className="align-middle p-3 mb-2 font-italic">Bienvenido {nombreDeUsuario}</h3>
                    <a href="http://localhost:3000/contentperfil#panelsStayOpen-headingThree" title="Dirígete a la sección de tus trueques en curso" className="text-decoration-none">
                        <h4 className="align-middle p-3 mb-2 font-italic  fs-3">Tus trueques en curso</h4>
                    </a>


                    <NotificationBell notifications={propuestas} activeNotifications={cantidadPropuestas} sendDeleteMessagesRequest={sendDeleteMessagesRequest} openNotification={openNotification}/>
                    {/*<button type="button" class="btn btn-primary">
                        <FaBell size={25}/> <span id="notification" className="badge badge-light">7</span>
                    </button>*/}
                    {/*<button className="btn btn-success font-weight-bold">Click notif</button>*/}
                </nav>
            </div>
        </>
    )
}