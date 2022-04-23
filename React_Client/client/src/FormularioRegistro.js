import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import ReactDOM from 'react-dom';

import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
//import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import './FormReg.css';


export const ReactFinalFormDemo = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const validate = (data) => {
        let errors = {};

        if (!data.usu) {
        errors.usu = "El nombre de usuario con el que te identificarán es requerido.";
        }
    
        if (!data.password) {
        errors.password = "La contraseña es requerida.";
        } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(data.password) // Letras, numeros, caracteres excepto @#$%^& y mínimo 8 caracteres
        ) {
        errors.password = "Debe tener más de 8 caracteres, al menos un número y al menos un caracter especial.";
        }

        if (!data.email) {
        errors.email = "Tu correo de contacto es requerido.";
        } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)//855
        ) {
        errors.email = "Direción de correo inválida. Ej.: example@email.com";
        }

        if (!data.name) {
        errors.name = "Tu nombre es requerido.";
        } else if (
        !/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(data.name) // Letras y espacios, pueden llevar acentos.
        ){
        errors.name = "Los nombres solo pueden contener letras, espacios y acentos.";
        }

        if (!data.lastname) {
        errors.lastname = "Tu apellido es requerido.";
        } else if (
        !/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(data.lastname) // Letras y espacios, pueden llevar acentos.
        ){
        errors.lastname = "Los apellidos solo pueden contener letras, espacios y acentos.";
        }
        
        //if (!data.date) {
        //errors.date = "Tu fecha de nacimiento es requerida.";
        //}
        /*<Field name="date" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="date" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Fecha de nacimiento*</label>
                                    </span>
                                </div>
                            )} /> */
        
        if (!data.edad) {
        errors.edad = "Tu edad es requerida.";
        }else if (
        !/^.{1,2}$/i.test(data.edad) // 1 a 2 digitos.
        ){
        errors.edad = "La edad solo puede contener dígitos.";
        }

        if (!data.celu) {
        errors.celu = "Tu número de celular es requerido.";
        }else if (
        !/^.{10}$/i.test(data.celu) // 10 digitos.
        ){
        errors.celu = "El celular solo puede contener 10 dígitos.";
        }

        if (!data.accept) {
        errors.accept = "Es necesario estar de acuerdo con los términos y condiciones.";
        }

        return errors;
    };

    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);

        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
    const passwordHeader = <h6>Digita una contraseña</h6>;
    const passwordFooter = (
        <React.Fragment>
        <Divider />
        <p className="mt-2">Sugerencias</p>
        <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
            <li>Al menos una minúscula</li>
            <li>Al menos una mayúscula</li>
            <li>Al menos un número</li>
            <li>Mínimo 8 caracteres</li>
        </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>¡Registro exitoso!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        Tu cuenta está registrada bajo el nombre <b>{formData.usu}</b>
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Registro</h5>
                    <Form onSubmit={onSubmit} initialValues={{ usu: "", password: "", email: "", name: "", lastname: "", date: null, celu: "", face: "", twit: "", inst: "", accept: false}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            
                            <Field name="usu" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="usu" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="usu" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Usuario*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
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
                            <Field name="name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nombres*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="lastname" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="lastname" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="lastname" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Apellidos*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="edad" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="edad" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="edad" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Edad*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="celu" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="celu" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="celu" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Celular*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />     
                            <Field name="face" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="face" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="face" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Facebook</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} /> 
                            <Field name="twit" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="twit" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="twit" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Twitter</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />     
                            <Field name="inst" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="inst" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="inst" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Instagram</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />                     
                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Acepto términos y condiciones*</label>
                                </div>
                            )} />

                            <Button type="submit" label="Enviar" className="mt-2" />
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}
                
const rootElement = document.getElementById("root");
ReactDOM.render(<ReactFinalFormDemo />, rootElement);

