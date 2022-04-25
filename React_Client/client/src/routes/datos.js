import React, { Fragment } from 'react';
import { useParams } from "react-router-dom";

export default function Datos() {
    const {email} = useParams();
    return (
        <Fragment>
            <h2>Bienvenido usuario</h2>
            <h6>Tu correo es: {email}</h6>
        </Fragment>
    );
}