import React, {useState,useEffect} from "react";
import { FaBell } from "react-icons/fa";
import "./notificationBell.css"

export default function NotificationBell(props){
    
    useEffect( ()=> {}, [props.notifications]);
    return (
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <FaBell size={25}/> 
            <span id="notification" className="badge badge-light">{props.activeNotifications}</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {props.notifications.length > 0 ?                                  
                    //Si la cantidad de propuestas es diferente de cero, las imprime
                    props.notifications.map((item) => {                                 
                        
                        if(item.estado_propuesta === 'en espera'){
                            console.log(item.notificacion_email);
                            console.log(item.email_proponente);
                            if(item.notificacion_email.localeCompare(item.email_receptor) === 0){                                            
                                return(                              
                                    <li class="dropdown-item"> 
                                    <p onClick={async ()=> { await props.openNotification(item.id_propuesta)}}  className = {item.notificacion_abierta? "text-reset text-decoration-none fst-italic fs-5 OpenedNotification pointerCursor" :"text-reset text-decoration-none fst-italic fs-5 pointerCursor"}>
                                    Tienes una propuesta del usuario <i>{item.nombre}</i> por tu producto: {item.titulo}
                                    </p>
                                    </li>                                       
                                )
                            }
                            else if(item.notificacion_email.localeCompare(item.email_proponente) === 0 ) {
                                return(                                                                                             
                                <li class="dropdown-item">
                                    <p onClick={async ()=> { await props.openNotification(item.id_propuesta)}}  className = {item.notificacion_abierta? "text-reset text-decoration-none fst-italic fs-5 OpenedNotification pointerCursor" :"text-reset text-decoration-none fst-italic fs-5 pointerCursor"}>
                                    Has hecho una propuesta al usuario <i>{item.nombre}</i> por el producto: {item.titulo}
                                    </p>    
                                </li>                                       
                                
                                )
                            }
                        }                                    
                        
                        else if(item.estado_propuesta === 'aceptada'){
                            if(item.notificacion_email.localeCompare(item.email_receptor) === 0 ){
                                return(                              
                                    <li class="dropdown-item"> 
                                    <p onClick={async ()=> { await props.openNotification(item.id_propuesta)}}  className = {item.notificacion_abierta? "text-reset text-decoration-none fst-italic fs-5 OpenedNotification pointerCursor" :"text-reset text-decoration-none fst-italic fs-5 pointerCursor"}>
                                    Has aceptado la oferta del usuario <i>{item.nombre}</i> por tu producto: {item.titulo}
                                    </p>
                                    </li>                                       
                                )
                            }
                            else if(item.notificacion_email.localeCompare(item.email_proponente) === 0) {
                                return(                              
                                <li class="dropdown-item"> 
                                <p onClick={async ()=> { await props.openNotification(item.id_propuesta)}}  className = {item.notificacion_abierta? "text-reset text-decoration-none fst-italic fs-5 OpenedNotification pointerCursor" :"text-reset text-decoration-none fst-italic fs-5 pointerCursor"}>
                                El usuario <i>{item.nombre}</i> ha aceptado la oferta por el producto: {item.titulo}
                                </p>
                                    </li>                                         
                                )
                            }
                        }

                        else if(item.estado_propuesta === 'rechazada'){
                            if(item.notificacion_email.localeCompare(item.email_receptor) === 0){
                                return(                              
                                    <li class="dropdown-item"> 
                                    <p onClick={async ()=> { await props.openNotification(item.id_propuesta)}}  className = {item.notificacion_abierta? "text-reset text-decoration-none fst-italic fs-5 OpenedNotification pointerCursor" :"text-reset text-decoration-none fst-italic fs-5 pointerCursor"}>
                                    Has rechazado la oferta del usuario <i>{item.nombre}</i> por tu producto: {item.titulo}
                                    </p>
                                    </li>                                       
                                )
                            }
                            else if(item.notificacion_email.localeCompare(item.email_proponente) === 0) {
                            return(                              
                                <li class="dropdown-item"> 
                                <p onClick={async ()=> { await props.openNotification(item.id_propuesta)}}  className = {item.notificacion_abierta? "text-reset text-decoration-none fst-italic fs-5 OpenedNotification pointerCursor" :"text-reset text-decoration-none fst-italic fs-5 pointerCursor"}>
                                El usuario <i>{item.nombre}</i> ha rechazado la oferta por el producto: {item.titulo}
                                </p>
                                    </li>                                         
                                )
                            }
                        }

                        else if(item.estado_propuesta === 'concluida'){
                            return(                              
                                <li class="dropdown-item"> 
                                <p onClick={async ()=> { await props.openNotification(item.id_propuesta)}}  className = {item.notificacion_abierta? "text-reset text-decoration-none fst-italic fs-5 OpenedNotification pointerCursor" :"text-reset text-decoration-none fst-italic fs-5 pointerCursor"}>
                                El trueque del producto: {item.titulo} ha finalizado
                                </p>
                                    </li>                                         
                            )                                        
                        }
                        
                        else if(item.estado_propuesta === 'cancelada'){
                            return(                              
                                <li class="dropdown-item"> 
                                <p onClick={async ()=> { await props.openNotification(item.id_propuesta)}}  className = {item.notificacion_abierta? "text-reset text-decoration-none fst-italic fs-5 OpenedNotification pointerCursor" :"text-reset text-decoration-none fst-italic fs-5 pointerCursor"}>
                                El trueque del producto: {item.titulo} se ha cancelado
                                </p>
                                    </li>                                         
                            )                                        
                        }

                    })
                    :
                    //Si la cantidad de propuestas es igual a cero imprime este mensaje
                    <li class="dropdown-item">No has recibido ninguna propuesta de trueque</li>
                }
                <li class="dropdown-item"> 
                <button type="button" className="btn btn-dark" onClick={props.sendDeleteMessagesRequest}> Borrar mensajes </button>
                </li>
                
            </ul>
        </div>
    )
}