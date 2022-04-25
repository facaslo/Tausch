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


function ReactFinalFormDemo () {
    const [showMessageAccept, setShowMessageAccept] = useState(false);
    const [showMessageDeny, setShowMessageDeny] = useState(false);
    const [formData, setFormData] = useState({});
    let responseFromServer;
    let dataFromApiRegister;


    const validate = (data) => {
        let errors = {};

        if (!data.userName) {
        errors.userName = "El nombre de usuario con el que te identificarán es requerido.";
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

        if (!data.firstName) {
        errors.firstName = "Tu nombre es requerido.";
        } else if (
        !/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(data.firstName) // Letras y espacios, pueden llevar acentos.
        ){
        errors.firstName = "Los nombres solo pueden contener letras, espacios y acentos.";
        }

        if (!data.lastName) {
        errors.lastName = "Tu apellido es requerido.";
        } else if (
        !/^[a-zA-ZÀ-ÿ\s]{1,40}$/i.test(data.lastName) // Letras y espacios, pueden llevar acentos.
        ){
        errors.lastName = "Los apellidos solo pueden contener letras, espacios y acentos.";
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
        
        if (!data.age) {
        errors.age = "Tu edad es requerida.";
        }else if (
        !/^\d{1,2}$/i.test(data.age) // 1 a 2 digitos.
        ){
        errors.age = "La edad solo puede contener dígitos.";
        }

        if (!data.phoneNumber) {
        errors.phoneNumber = "Tu número de celular es requerido.";
        }else if (
        !/^\d{10}$/i.test(data.phoneNumber) // 10 digitos.
        ){
        errors.phoneNumber = "El celular solo puede contener 10 dígitos.";
        }

        if (!data.accept) {
        errors.accept = "Es necesario estar de acuerdo con los términos y condiciones.";
        }

        return errors;
    };
    
    const onSubmit = async (data, form) => {
        await setFormData(data);
        await sendRegisterToServer(data);
        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooterAccept = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"  onClick={() => setShowMessageAccept(false) } /></div>;
    const dialogFooterDeny = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"  onClick={() => setShowMessageDeny(false) } /></div>;
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

    const sendRegisterToServer = async (data) => {
        await fetch(`http://localhost:3080/register`,{            
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => responseFromServer = response.json()).then((data)=> dataFromApiRegister=data).catch(error=> console.log(error));
    
        if (dataFromApiRegister.registerSuccess){//verifica si se realiza el registro en la bd correctamente
            setShowMessageAccept(true);
        }else{
            setShowMessageDeny(true);
    
        }
    };



    

    return (
        <div className="form-demo">
            <Dialog visible={showMessageAccept} onHide={() => setShowMessageAccept(false)} position="top" footer={dialogFooterAccept} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Para culminar su registro</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        Tu cuenta está registrada bajo el nombre <b>{formData.userName}</b> y se te envió un correo para que actives tu cuenta
                    </p>
                </div>
            </Dialog>

            <Dialog visible={showMessageDeny} onHide={() => setShowMessageDeny(false)} position="top" footer={dialogFooterDeny} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>El correo o nombre de usuario ya están registrados</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        Verifica tus datos y vuelve a intentar
                    </p>
                </div>
            </Dialog>


            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Registro</h5>
                    <Form onSubmit={onSubmit} initialValues={{ userName: "", password: "", email: "", firstName: "", lastName: "", phoneNumber: "", facebook: "", twitter: "", instagram: "", accept: false}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            
                            <Field name="userName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="userName" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="userName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Usuario*</label>
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
                            <Field name="firstName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="firstName" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nombres*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="lastName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="lastName" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Apellidos*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="age" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="age" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="age" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Edad*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="phoneNumber" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="phoneNumber" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="phoneNumber" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Celular*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />     
                            <Field name="facebook" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="facebook" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="facebook" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Facebook</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} /> 
                            <Field name="twitter" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="twitter" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="twitter" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Twitter</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />     
                            <Field name="instagram" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="instagram" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="instagram" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Instagram</label>
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
                
export default ReactFinalFormDemo
// ReactDOM.render(<ReactFinalFormDemo />, rootElement);

