import React, {useState, useEffect} from "react";
import FormPublication from '../FormPublication';

const CreatePublication = () => {

    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [authenticated, setauthenticated] = useState(false);
    
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

            //Si no esta logueado, entonces redirigirlo a la pantalla home
            if (parseRes !== true){
                window.location.replace("/");
            }

            } catch(err){
                console.error(err.message);
            }
    }

    //Llamar la funcion para verificar si esta loggeado
    useEffect(() => {
        (async () => {
            await isAuth();
        })();
    },[]);

    return(
        <>
         <FormPublication/>     
        </>
    );
}

export default CreatePublication