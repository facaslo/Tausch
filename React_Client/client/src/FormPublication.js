import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import ReactDOM from 'react-dom';

import React, { useEffect, useRef,useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import './FormReg.css';


function FormPublication (authenticated) {
    const [showMessageAccept, setShowMessageAccept] = useState(false);
    const [showbutup, setShowbutup] = useState(false);
    const [formData, setFormData] = useState({});
    let responseFromServer;
    let dataFromApiPublication;
    const [showSubcategory, setShowSubcategory]=useState(false)
    //const [showImageError, setShowImageError]=useState(false)
    //let val1;
    //const toast = useRef(null);
    const componentRef = React.useRef();

    /*const onUpload = () => {
        console.log('b');
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }*/

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedExCategory, setSelectedExCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);


    const stateOptions= [
        {label: 'nuevo', code:'nuevo'},
        {label: 'usado', code:'usado'}
    ]

    let subcategoryOptions=[]

    const categoryOptions = [
        {label: 'Tecnología', code: 'Tecnología'},
        {label: 'Ropa y accesorios', code: 'Ropa y accesorios'},
        {label: 'Deportes', code: 'Deportes'},
        {label: 'Arte', code: 'Arte'},
        {label: 'Entretenimiento', code: 'Entretenimiento'},
        {label: 'Hogar', code: 'Hogar'},
        {label: 'Servicios', code: 'Servicios'},
        {label: 'Libros y revistas', code: 'Libros y revistas'},
        {label: 'Música', code: 'Música'},
        {label: 'Vehículos', code: 'Vehículos'},
        {label: 'Otros', code: 'Otros'}
    ];

    
    const subTecnology = [
        {label: 'Videojuegos', code: 'Videojuegos'},
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
        {label: 'Casual', code: 'Casual'},
        {label: 'De trabajo', code: 'De trabajo'},
        {label: 'Accesorios', code: 'Accesorios'},
        {label: 'Otros', code: 'Otros'}
    ];
    
    const subSports = [
        {label: 'Gimnasio', code: 'Gimnasio'},
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
        {label: 'Comics', code: 'Comics'},
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
        'Entretenimiento':subEntertaiment,
        'Hogar':subHome,
        'Libros y revistas':subBooks,
        'Música':subMusic,
        'Vehículos':subVehicles,
        'Otros':[] 
    }

    const onCategoryChange = (e) => {
        setSelectedCategory(e.value);
        // console.log(selectedCategory);
        setSelectedSubcategory(null);        
    }

    const onSubcategoryChange = (e,data) => {
        setSelectedSubcategory(e.value);        
    }

    const onCategoryExChange = (e) => {        
        setSelectedExCategory(e.value);       
    }

    const onStateChange =(e) => {
        setSelectedState(e.value);
    }

    const dialogFooterAccept = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"  onClick={() => setShowMessageAccept(false) } /></div>;

    const validate = (data) => {
        let errors = {};
                
        //console.log(document.getElementsBy);

        if (selectedCategory != null){
            let sCategory=selectedCategory.label;
            data.category=sCategory;
            subcategoryOptions=subcategories[sCategory];
            //console.log(componentRef.current.value)
            
        }

        if (selectedCategory != null && selectedCategory.label != 'Otros' && selectedCategory.label != 'Servicios' ){
            setShowSubcategory(true);
        }
        else{
            setShowSubcategory(false);
        }
        

        if (selectedSubcategory != null){
            data.subcategory=selectedSubcategory.label;
        }else{
            data.subcategory='';
        }
        
        if (selectedExCategory != null){
            data.exchange_for=selectedExCategory.label;
        }

        if (selectedState != null){
            data.item_status=selectedState.label;
        }

        if (!data.title) {
        errors.title = "Debes ingresar un título a tu publicación";      
               
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

        if (!data.accept ) {
        errors.accept = "Es necesario estar de acuerdo con los términos y condiciones.";
        }
        
        /*if (componentRef.current == null){
            console.log('m')
            
        }else if (componentRef.current.value==""){
            console.log('j')
            setShowImageError(true)
        }
        else{
            setShowImageError(false)
        }*/       
        
        //console.log(data)        
        return errors;
    };

    const onSubmit = async (data, form) => { 
        let objectForm              

        if (selectedSubcategory!=null){
            objectForm = {"title":data.title, "category": selectedCategory.label, "subcategory": selectedSubcategory.label, "description": data.description, "item_status": selectedState.label, "exchange_for": selectedExCategory.label, "file": selectedFile , "accept": data.accept};
        }
        else{
            objectForm = {"title":data.title, "category": selectedCategory.label, "subcategory": '',"description": data.description, "item_status": selectedState.label, "exchange_for": selectedExCategory.label, "file": selectedFile , "accept": data.accept};
        }
        let request = new FormData();
        for(let field in objectForm){
            request.append(field, objectForm[field])
        }
        console.log(request)
        await sendRegisterToServer(objectForm);
        form.restart();
        window.location.href = "localhost:3000/"
    };


    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const sendRegisterToServer = async (data) => {
        await fetch(`http://localhost:3080/new-post`,{            
            method : 'POST',
            headers: {
                'token': localStorage.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => responseFromServer = response.json()).then((data)=> dataFromApiPublication=data).catch(error=> console.log(error));
    
        if (dataFromApiPublication.postingSuccess){//verifica si se realiza el registro en la bd correctamente
            setShowMessageAccept(true);
        }
    };
    const chooseOptions = {label: 'Elegir', icon: 'pi pi-fw pi-check-circle'};
    const uploadOptions = {label: 'Upload', icon: 'pi pi-upload'};
    const cancelOptions = {label: 'Cancelar', icon: 'pi pi-times', className: 'p-button-danger'};

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded         
        try{
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob); 
        reader.onloadend = function () {
            const base64data = reader.result;
            setSelectedFile(base64data)
            console.log(base64data);
        }
        }
        catch(e){
            console.log(e)
        }
    }

    return (
        
        <div className="form-demo">
            {/*<Toast ref={toast}></Toast>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />*/}
            <Dialog visible={showMessageAccept} onHide={() => setShowMessageAccept(false)} position="top" footer={dialogFooterAccept} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>¡Tu publicación ha sido creada!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        Ahora puedes empezar a recibir propuestas
                    </p>
                </div>
            </Dialog>


            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Crear publicación</h5>
                    <Form onSubmit={onSubmit} initialValues={{ title: "", category: "", subcategory: "", description: "", item_status: "", exchange_for: "", file:"", accept: false}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid" >
                            
                            <Field name="title" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="title" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="title" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Título*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="category" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown  name="category" id="category" {...input} value={selectedCategory} options={categoryOptions} onChange={onCategoryChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="category" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Categoria*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                                
                            )} />
                           <div className={showSubcategory ? "":"butup"}>
                            <Field name="subcategory" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="subcategory" {...input} value={selectedSubcategory} options={subcategoryOptions} onChange={onSubcategoryChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="subcategory" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Subcategoria*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            </div>
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
                                        <Dropdown id="item_status" {...input} value={selectedState} options={stateOptions} onChange={onStateChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="item_status" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Estado*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="exchange_for" type="dropdown" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="exchange_for" {...input} value={selectedExCategory} options={categoryOptions} onChange={onCategoryExChange}  optionLabel="label" className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                                        <label htmlFor="exchange_for" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Intercambio por</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />      

                            {/* <h6>Sube las imágenes de tu publicación:</h6>
                            <input id="file" type="file" name="file" accept="image/*" multiple='true'  required/> */}
                            {/*<br/>
                            <div className={showImageError ? "":"butup"}>
                                Sube al menos una imagen
                            </div>*/}
                            <br/>
                            <br/>

                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                                <div className="field-checkbox">
                                    <Checkbox inputId="accept" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Acepto términos y condiciones*</label>
                                </div>
                            )} />

                            
                            <FileUpload name="file" accept="image/*" auto customUpload uploadHandler={customBase64Uploader} uploadOptions={uploadOptions} />                            
                            

                            <Button type="submit" label="Publicar" className="mt-2" />

                           
                        
                        </form>
                    )} />
                </div>
                
            </div>
        </div>
    );

}
                
export default FormPublication