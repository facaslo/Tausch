import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import './FormReg.css';


import React, { useEffect, useRef,useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

function FormProposal (parameters) {

    let responseFromServer
    let dataFromApiNewOffer

    const [showMessageAccept, setShowMessageAccept] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    let direction="/publication/"+parameters.id_publicacion_receptor;
    
    const dialogFooterAccept = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"  onClick={() => window.location.replace(direction) } /></div>;
    
    const productOptions = [
        {label: 17, code: 17},
        {label: 20, code: 20},
        {label: 22, code: 22}
    ];

    const onProductExChange = (e) => {        
        setSelectedProduct(e.value);       
    }
    
    const validate = (data) => {
        let errors = {}; 
        
        if (selectedProduct != null){
            data.exchange_for=selectedProduct.label;
        }     

        if (!data.message) {
        errors.message = "Debes incluir un comentario con la propuesta";      
               
        }

        if (!data.exchange_for) {
            errors.exchange_for = "Selecciona uno de tus productos que quieras intercambiar";
        }

        if (!data.accept ) {
            errors.accept = "Debes aceptar compartir tus datos de contacto para realizar una propuesta";
        }
           
        return errors;
    };
    
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    
    const onSubmit = async (data, form) => { 
        let objectProposal
        objectProposal={'email_receptor':parameters.email_receptor, 'email_proponente':parameters.email_proponente, 'id_publicacion_receptor':parameters.id_publicacion_receptor, 'id_publicacion_proponente':selectedProduct.label, 'mensaje':data.message}
        await sendProposalToServer(objectProposal)
        form.restart();
    };

    const sendProposalToServer = async (data) => {
        await fetch(`http://localhost:3080/new-offer`,{            
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => responseFromServer = response.json()).then((data)=> dataFromApiNewOffer=data).catch(error=> console.log(error));
    
        if (dataFromApiNewOffer.offerSuccess){//verifica si se realiza el registro en la bd correctamente
            setShowMessageAccept(true);
        }
    };

    return (
        
        <div className="form-demo">
            <Dialog visible={showMessageAccept} onHide={() => setShowMessageAccept(false)} position="top" footer={dialogFooterAccept} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>¡Tu propuesta ha sido enviada!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        Ahora debes esperar a que sea aceptada
                    </p>
                </div>
            </Dialog>


            <div className="flex justify-content-center">
                <div className="card">
                    <br/>
                    <h5 className="text-center">Crear propuesta</h5>
                    <Form onSubmit={onSubmit} initialValues={{ message: "", exchange_for: "", accept: false}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid" >
                            
                            <Field name="message" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="message" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="message" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Mensaje*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            
                            <Field name="exchange_for" type="dropdown" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="exchange_for" {...input} value={selectedProduct} options={productOptions} onChange={onProductExChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="exchange_for" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Intercambio por</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />    

                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Acepto que mi información de contacto sea compartida si la propuesta es aceptada*</label>
                                </div>
                            )} />

                            <Button type="submit" label="Publicar" className="mt-2" />
                        
                        </form>
                    )} />
                </div>
                
            </div>
        </div>
    );

}
                
export default FormProposal