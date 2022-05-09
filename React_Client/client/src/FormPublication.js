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
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import './FormReg.css';


function FormPublication () {
    const [formData, setFormData] = useState({});
    let responseFromServer;
    let dataFromApiLogin;


    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedExCategory, setSelectedExCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    let subcategoryOptions=[]

    const categoryOptions = [
        {label: 'Tecnología', code: 'Tecnología'},
        {label: 'Ropa y accesorios', code: 'Ropa y accesorios'},
        {label: 'Deportes', code: 'Deportes'},
        {label: 'Arte', code: 'Arte'},
        {label: 'Entretenimineto', code: 'Entretenimiento'},
        {label: 'Hogar', code: 'Hogar'},
        {label: 'Servicios', code: 'Servicios'},
        {label: 'Libros y Revistas', code: 'Libros y Revistas'},
        {label: 'Música', code: 'Música'},
        {label: 'Vehículos', code: 'Vehículos'},
        {label: 'Otros', code: 'Otros'}
    ];

    
    const subTecnology = [
        {label: 'Videojuegos', code: 'Videojuegos1'},
        {label: 'Computadores', code: 'Computadores'},
        {label: 'Cámaras', code: 'Cámaras'},
        {label: 'Televisores', code: 'Televisores'},
        {label: 'Celulares', code: 'Celulares'},
        {label: 'Otros', code: 'Otros'}
    ];
    
    const subClothes = [
        {label: 'Formal', code: 'Formal'},
        {label: 'Deportiva', code: 'Deportiva'},
        {label: 'De playa', code: 'De playa'},
        {label: 'De trabajo', code: 'De trabajo'},
        {label: 'Accesorios', code: 'Accesorios'},
        {label: 'Otros', code: 'Otros'}
    ];
    
    const subSports = [
        {label: 'Gimansio', code: 'Gimansio'},
        {label: 'Implementos deportivos', code: 'Implementos deportivos'},
        {label: 'Bicicletas y movilidad', code: 'Bicicletas y movilidad'},
        {label: 'Otros', code: 'Otros'}
    ];
    
    const subArt = [
        {label: 'Obras', code: 'Obras'},
        {label: 'Materiales', code: 'Materiales'},
        {label: 'Afiches', code: 'Afiches'},
        {label: 'Otros', code: 'Otros'}
    ];
     
    const subEntertaiment = [
        {label: 'Juegos de mesa', code: 'Juegos de mesa'},
        {label: 'Juguetes', code: 'Juguetes'},
        {label: 'Películas', code: 'Películas'},
        {label: 'Otros', code: 'Otros'}
    ];

    const subHome = [
        {label: 'Electrodomésticos', code: 'Electrodomésticos'},
        {label: 'Decoración', code: 'Decoración'},
        {label: 'Muebles', code: 'Muebles'},
        {label: 'Jardineria', code: 'Jardineria'},
        {label: 'Otros', code: 'Otros'}
    ]; 

    const subBooks = [
        {label: 'Literatura', code: 'Literatura'},
        {label: 'Comic', code: 'Comic'},
        {label: 'Revistas', code: 'Revistas'},
        {label: 'Otros', code: 'Otros'}
    ];

    const subMusic = [
        {label: 'Instrumentos', code: 'Instrumentos'},
        {label: 'Discos', code: 'Discos'},
        {label: 'Otros', code: 'Otros'}
    ];

    const subVehicles = [
        {label: 'Motos', code: 'Motos'},
        {label: 'Automóviles', code: 'Automóviles'},
        {label: 'Accesorios y herramientas', code: 'Accesorios y herramientas'},
        {label: 'Repuestos y partes', code: 'Repuestos y partes'},
        {label: 'Otros', code: 'Otros'}
    ];

    const subcategories={
        'Tecnología': subTecnology,
        'Ropa y accesorios': subClothes,
        'Deportes':subSports,
        'Arte':subArt,
        'Entretenimineto':subEntertaiment,
        'Hogar':subHome,
        'Libros y Revistas':subBooks,
        'Música':subMusic,
        'Vehículos':subVehicles,
        'Otros':[] 
    }

    const onCategoryChange = (e) => {
        setSelectedCategory(e.value);
        setSelectedSubcategory(null);        
    }

    const onSubcategoryChange = (e,data) => {
        setSelectedSubcategory(e.value);
        console.log(data)        
    }

    const onCategoryExChange = (e) => {
        setSelectedExCategory(e.value);       
    }

    const validate = (data) => {
        let errors = {};

        if (selectedCategory != null){
            let sCategory=selectedCategory.label;
            data.category=sCategory;
            subcategoryOptions=subcategories[sCategory];
            console.log(subcategories.Tecnología)
        }else if (data.category == 'Otros' || data.category == 'Servicios' ){
            
        }

        if (selectedSubcategory != null){
            data.subcategory=selectedSubcategory.label;
        }else{
            data.subcategory='';
        }
        
        if(selectedExCategory != null){
            data.exchange_for=selectedExCategory.label;
        }

        if (!data.title) {
        errors.title = "Debes ingresar un título a tu publicación";
        console.log(data)
               
        }
    
        if (!data.category) {
        errors.category = "Selecciona una categoría";
        }

        if (!data.subcategory && (data.category != 'Otros' && data.category != 'Servicios' )) {
        errors.subcategory = "Selecciona una subcategoría";
        }

        if (!data.description) {
        errors.description = "Ingresa una descripción para tu producto";
        }

        if (!data.item_status) {
        errors.item_status = "Especifica el estado de tu producto";
        }

        if (!data.accept) {
        errors.accept = "Es necesario estar de acuerdo con los términos y condiciones.";
        }

        return errors;
    };

    const onSubmit = async (data, form) => {
        /*await setFormData(data);
        await sendRegisterToServer(data);
        form.restart();*/
    };


    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    /*const sendRegisterToServer = async (data) => {
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
    };*/

    return (
        <div className="form-demo">


            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Crear publicación</h5>
                    <Form onSubmit={onSubmit} initialValues={{ title: "", category: "", subcategory: "", description: "", item_status: "", exchange_for: "", accept: false}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            
                            <Field name="title" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="title" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="title" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Título*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="category"   render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="category" {...input} value={selectedCategory} options={categoryOptions} onChange={onCategoryChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="category" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Categoria*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                                
                            )} />
                           
                            <Field name="subcategory" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="subcategory" {...input} value={selectedSubcategory} options={subcategoryOptions} onChange={onSubcategoryChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="subcategory" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Subcategoria*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="description" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="description" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="description" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Descripción*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="item_status" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="item_status" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="item_status" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Estado*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="exchange_for" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="exchange_for" {...input} value={selectedExCategory} options={categoryOptions} onChange={onCategoryExChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="exchange_for" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Intercambio por</label>
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

                            

                            <Button type="submit" label="Publicar" className="mt-2" />
                        </form>
                    )} />
                    
                </div>
                
            </div>
        </div>
    );

}
                
export default FormPublication