import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import './FormReg.css';

function ReactFormLogin(){
    const [showMessageCredentials, setShowMessageCredentials] = useState(false);
    const [showMessageActivation, setShowMessageActivation] = useState(false);
    const [formData, setFormData] = useState({});
    let responseFromServer;
    let dataFromApiLogin;

    const validate = (data) => {
        let errors = {};
        if (!data.email) {
            errors.email = "Ingresa tu dirección de correo";
            }
        if (!data.password) {
            errors.password = "La contraseña es requerida.";
            }

        return errors;

    };    

    const onSubmit = async (data, form) => {
        await setFormData(data);             
        await sendLoginToServer(data);
        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooterCredentials = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessageCredentials(false) } /></div>;
    const dialogFooterActivation = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessageActivation(false) } /></div>;

    const sendLoginToServer = async (data) => {
        await fetch(`http://localhost:3080/login`,{            
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => responseFromServer = response.json()).then((data)=> dataFromApiLogin=data).catch(error=> console.log(error));
        
        //Verificar si las credenciales fueron correctas
        if (dataFromApiLogin.credentialsValidated){
            
            //Verificar si la cuenta esta activada
            if (dataFromApiLogin.isActivated){
                //Guardar la token del usuario
                //En el localstorage para saber que hizo log in
                localStorage.setItem("token",dataFromApiLogin.token);

                //Ir a la pagina home despues de hacer log in
                window.location = `/`;

            }else{
                setShowMessageActivation(true);
            }
        }else{
            setShowMessageCredentials(true);
        }
    };

    return(
        <div className="form-demo">
            <Dialog visible={showMessageCredentials} onHide={() => setShowMessageCredentials(false)} position="top" footer={dialogFooterCredentials} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>Correo o contraseña incorrectos</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        Intenta de nuevo
                    </p>
                </div>
            </Dialog>

            <Dialog visible={showMessageActivation} onHide={() => setShowMessageActivation(false)} position="top" footer={dialogFooterActivation} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '5rem', color: 'var(--yellow-500)' }}></i>
                    <h5>La cuenta no ha sido activada por medio de correo electronico.</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        Revisa tu bandeja de entrada y spam.
                    </p>
                </div>
            </Dialog>
            
            <div className="flex justify-content-center">
                <div className="card">
                    <h3 className="text-center">Inicio de Sesión</h3>
                    <Form onSubmit={onSubmit} initialValues={{ password: "", email: ""}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <br/>
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} feedback={false} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })}  />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Button type="submit" label="Ingresar" className="mt-2" />
                        </form>
                    )} />
                </div>
            </div>
        </div>


    );    
}

export default ReactFormLogin


