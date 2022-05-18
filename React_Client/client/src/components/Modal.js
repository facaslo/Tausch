import React from "react";
import "./Modal.css"

const Modal = ( {children, estado, cambiarEstado} ) => {
    return (
        <>
            {estado &&
                <div className ="overlay">
                    <div className ="contenedorModal">
                        <i className="pi pi-plus" onClick={() => cambiarEstado(false)}></i>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default Modal;