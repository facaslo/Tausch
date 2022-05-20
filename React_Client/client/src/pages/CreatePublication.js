import React, {useState, useEffect} from "react";
import FormPublication from '../FormPublication';

const CreatePublication = () => {
    
    //Verificar si la token esta activa
    //Con la funcion authorization
    //Y asi saber si hay alguien loggeado 
    //Si no hay nadei loggeado, redirigirlo a home
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