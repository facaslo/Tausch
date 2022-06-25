import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import './FormReg.css';


import React, { useEffect, useRef,useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import { PickList } from 'primereact/picklist';

function FormProposal (parameters) {

    let responseFromServer
    let dataFromApiNewOffer

    const [showMessageAccept, setShowMessageAccept] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productOptions, setProductOptions]=useState([])
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    let direction="/publication/"+parameters.id_publicacion_receptor;
    
    const dialogFooterAccept = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"  onClick={() => window.location.replace(direction) } /></div>;
    
    const requestPublicationsList= async() => {
        const url = "http://localhost:3080/user-posts";
        return await fetch(url,{            
            method : 'GET',
            headers:{token: localStorage.token}           
        })
        .then((response) => response.json()).catch(error=> console.log(error));
        
    };
    
    useEffect(() => {
        (async () => {
            let respuesta = await requestPublicationsList();
            respuesta.posts = respuesta.posts.filter((item) => {if(item.activa) return item});
            let publications=[]
            for (const pub of respuesta.posts){
                publications.push(pub)
            }
            setProductOptions(publications)
            setSource(publications)
            
        })();
    },[]);


    const onProductExChange = (e) => {        
        setSelectedProduct(e.value);       
    }
    
    const validate = (data) => {
        let errors = {};
        
        
        if (data.message && data.message.length>=201 ){
            let letters=data.message.length
            errors.message = "Tu comentario puede contener máximo 200 caracteres, tienes "+letters;
        }

        if (!data.message) {
        errors.message = "Debes incluir un comentario con la propuesta";      
               
        }

        if (target.length===0) {
            if (source.length===0){
                errors.exchange_for = "No tienes publicaciones, crea una para poder hacer propuestas"
            }
            else{errors.exchange_for = "Selecciona al menos uno de tus productos que quieras intercambiar";}

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
        let idList=[]
        for (const publ of target){
            idList.push(publ.id)
        }

        objectProposal={'email_receptor':parameters.email_receptor, 'email_proponente':parameters.email_proponente, 'id_publicacion_receptor':parameters.id_publicacion_receptor, 'mensaje':data.message,'lista_publicaciones':idList}
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

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    }

    const itemTemplate = (item) => {
        return (
            
            <div className="product-item">
                <div className="image-container">
                    <img src={item.imagen} style={{  maxWidth:'100px' }} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  />
                </div>
                <div className="product-list-detail">
                    <h6 className="mb-2">{item.titulo}</h6>
                   
                    <span className="product-category">{item.categoria}</span>
                </div>                
            </div>
        );
    }
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
                    <h5 className="text-center">Crear propuesta</h5>
                    <Form onSubmit={onSubmit} initialValues={{ message: "", exchange_for: "", accept: false}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid" >
                            
                            <Field name="message" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputTextarea id="message" {...input} rows={5} cols={40} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="message" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Mensaje*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="exchange_for" type="dropdown" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        {/*<Dropdown id="exchange_for" {...input} value={selectedProduct} options={productOptions} onChange={onProductExChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>*/}
                                        <h7><b>Selecciona al menos una de tus publicaciones para el trueque</b></h7>
                                        <PickList {...input}id="exchange_for" source={source} target={target} itemTemplate={itemTemplate} sourceHeader="Mis publicaciones" targetHeader="Artículos ofertados" sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }} onChange={onChange} showSourceControls={false} showTargetControls={false}></PickList>
                                        <label htmlFor="exchange_for" className={classNames({ 'p-error': isFormFieldValid(meta) })}></label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />    
                            <br/>
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