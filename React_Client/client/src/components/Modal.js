import React from "react";
import "./Modal.css"

const Modal = ( {children, estado, cambiarEstado} ) => {
    return (
        <>
            {estado &&
                <div className ="overlay">
                    <div className ="contenedorModal">
                        <button className="pi pi-plus" onClick={() => cambiarEstado(false)}></button>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default Modal;