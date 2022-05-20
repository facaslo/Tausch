import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import './FormReg.css';
import './Publication.css';

import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Galleria } from 'primereact/galleria';

function Publication (){

    const [datos, setDatos] = useState({});
    const [imagenPublicacion, SetImagenPublicacion] = useState([]);
    
    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [isAuthenticated, setisAuthenticated] = useState(false);

    //Estado para saber si el usuario actual es el propietario de la publicacion o no
    const [propietario, setPropietario] = useState(false);
    
    //Recibir el id del producto por medio de la ruta
    const {id} = useParams();
    
    let usuarioDueño = true;
    
    const requestPublicationInfo= async (id) => {
        const url = "http://localhost:3080/publication/" + id;
        return await fetch(url,{            
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },            
        })
        .then((response) => response.json()).catch(error=> console.log(error));
    };
   
    /*let datos= ({
        "name":"Fabián",
        "last_name":"Castro",
        "title":"Zapatos Rojos",
        "category":"Ropa y accesorios",
        "subcategory":"formal",
        "description":"zapatos buenos créanme",
        "publication_date":"2020-12-15",
        "item_state":"nuevo",
        "exchange_for":"Arte",
        "proposal_number":1
    });
    */
let ima=[
    //{"itemImageSrc": "../images/z2.png","alt": "z2","title": "Title 1"},
    //{"itemImageSrc": "../images/z3.png","alt": "z3","title": "Title 2"},
    //{"itemImageSrc": "../images/z.jpg","alt": "z1","title": "Title 0"}
]
    
    //const [images, setImages] = useState(null);

    //Verificar si la token esta activa Con la funcion authorization
    //Y asi saber si hay alguien loggeado y extraer el correo de esa persona
    async function isAuth(emailDueñoPublicacion){
        try{
            const response = await fetch("http://localhost:3080/authentication/is-verify",
            {
                method:"GET",
                headers:{token: localStorage.token}
            });

            //Retorna True si se tiene token valida
            const parseRes = await response.json();

            //Si es true, es que hay una token activa, entonces esta autenticado
            parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
            
            if (parseRes == true){
                //Si hay alguien autenticado,
                //entonces buscar su nombre_de_usuario
                const userData = await fetch("http://localhost:3080/authentication/getUserInfo",
                {
                    method:"GET",
                    headers:{token: localStorage.token}
                });

                const userDataJson = await userData.json();
                
                if(emailDueñoPublicacion == userDataJson[0].email){
                    setPropietario(true);
                }
            }
        } catch(err){
            console.error(err.message);
        }
    }

    useEffect(() => {
        (async () => {
            let respuesta = await requestPublicationInfo(id);
            let objetoImagen = {"itemImageSrc":respuesta.imagen, "alt":"No salio la imagen", "title":"Titulo de la imagen"};
            ima.push(objetoImagen);
            SetImagenPublicacion(ima);
            setDatos(respuesta);
            let respuestaAutenticacion = await isAuth(respuesta.email);
        })();
    },[]);
    
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3,
            style: {
            maxWidth: '100px',
            minWidth: '100px'}
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];


    const itemTemplate = (item) => {
        return <img src={`${item.itemImageSrc}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block'  }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={`images/${item.thumbnailImageSrc}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} />
    }
    const indicatorTemplate = (index) => {
        return (
            <span className="indicator-text">
                {index + 1}
            </span>
        )
    }
    
    
    
// <<Image src="images/z2.png" width="600" preview alt="Image Text" />
            
            

    return (

        <div >
            <br/>
            <br/>
            <div className="flex align-items-center justify-content-center">
                
               
                
            
                <Galleria value={imagenPublicacion} responsiveOptions={responsiveOptions} numVisible={5} style={{  maxWidth:'600px' }}
                showThumbnails={false} showIndicators item={itemTemplate} circular autoPlay transitionInterval={3000}/>
            
           


                <Divider layout="vertical" />
                

                <Card title={datos.titulo} subTitle={datos.categoria+", "+datos.subcategoria}>
                    <p className="flex justify-content-start text-primary" >{datos.estado_item}</p>
                    <span className="flex justify-content-start" ><b>Publicado: </b>&nbsp;{String (datos.fecha_publicacion).slice(0,10) +" por "+ datos.nombres + " " + datos.apellidos}</span>
                    <br/>
                    <br/>
                    <span className="flex justify-content-start">{datos.descripcion}</span>
                    <br/>
                    <br/>
                    <span className="flex justify-content-start"><b>Intercambio por:</b>&nbsp;{datos.intercambio_por}</span>
                    <span className="flex justify-content-start"><b>{datos.numero_propuestas}</b>&nbsp;Propuestas actualmente</span>
                    <br/>
                    <br/>
                    <div className={isAuthenticated? "":"no-display"}>
                        <div className={propietario? "butup":""}>
                            <Button label="Hacer propuesta" icon="pi pi-comments" />
                        </div>
                        <div className={propietario? "":"butup"}>
                            <Button label="Eliminar publicación" icon="pi pi-times-circle" className="p-button-danger"/>
                        </div>
                    </div>
                    <div className={isAuthenticated? "no-display":""}>
                        <p className="flex justify-content-start text-primary" >Para hacerle una propuesta de trueque a esta publicación primero Inicia Sesión</p>
                    </div>
                </Card>

            </div>
        </div>
    );


}

export default Publication