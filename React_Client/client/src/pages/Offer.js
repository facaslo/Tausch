import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primeicons/primeicons.css';
import { Checkbox } from 'primereact/checkbox';
import { Galleria } from 'primereact/galleria';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import "./General-container.css"

function Offer () {
    
    const [userEmail, setUserEmail]=useState(null);
    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [isAuthenticated, setisAuthenticated] = useState(false);

    //Estado para saber si el usuario actual es el propietario de la publicacion o no
    const [propietario, setPropietario] = useState(false);

    //Recibir el id de la oferta
    const {id} = useParams();

    const [id_pub_receptor, setId_pub_receptor] = useState();
    const [loading, setLoading] = useState(true);  

    const [datos, setDatos] = useState({});
    const [imagenPublicacion, SetImagenPublicacion] = useState([]);
    const [subcategoryText,setSubcategoryText]=useState("");

    let ima=[]

    //Intentos
    //const categories = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
    const [offers, setOffers] = useState([]);
    const [selectedOffers, setSelectedOffers] = useState([]);

    const onOfferChange = (e) => {
        let _selectedOffers = [...selectedOffers];

        if (e.checked) {
            _selectedOffers.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedOffers.length; i++) {
                const selectedOffer = _selectedOffers[i];

                if (selectedOffer.key === e.value.key) {
                    _selectedOffers.splice(i, 1);
                    break;
                }
            }
        
        }

        setSelectedOffers(_selectedOffers);
    }


    const requestOfferInfo= async (id) => {        
        const url = "http://localhost:3080/all-offers/";
        return await fetch(url,{            
            method : 'POST',
            headers:{token: localStorage.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ idOffer: id })
            //{ idOffer: id }          
        })
        .then((response) => response.json()).catch(error=> console.log(error));
    };

    //Verificar si la token esta activa Con la funcion authorization
    //Y asi saber si hay alguien loggeado y extraer el correo de esa persona
    {/*async function isAuth(emailDueñoPublicacion){
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
                setUserEmail(userDataJson[0].email);
                
                if(emailDueñoPublicacion == userDataJson[0].email){
                    setPropietario(true);
                }
            }
        } catch(err){
            console.error(err.message);
        }
    }*/}

    const Loading = () => {
        if(loading === false){
            return(
            <>

                    <div className="card-group">
                        <div className="card border-primary mb-3 mt-3">
                            <div className="card-header text-center text-dark bg-transparent">
                                <h4>Tu publicación</h4>
                            </div>
                            <div className="card-body">
                            {/*<PublicationInOffer argumento_id = {id_pub_receptor}/>*/}
                            <>
                                    <div flex justify-content-center>
                                        <div className="flex align-items-center justify-content-center">

                                            <Galleria value={imagenPublicacion} responsiveOptions={responsiveOptions} numVisible={1} style={{  maxWidth:'200px' }}
                                                    showThumbnails={false} showIndicators item={itemTemplate} circular autoPlay transitionInterval={3000} />
                                                

                                            {/*<Divider layout="horizontal" />*/}


                                            <Card title={datos.titulo} subTitle={datos.categoria+subcategoryText}>
                                                <p className="flex justify-content-start text-primary" >{datos.estado_item}</p>
                                                <span className="flex justify-content-start" ><b>Publicado: </b>&nbsp;{String (datos.fecha_publicacion).slice(0,10) }</span>
                                                <br/>
                                                <br/>
                                                <span className="flex justify-content-start">{datos.descripcion}</span>
                                                <br/>
                                                <span className="flex justify-content-start"><b>{datos.numero_propuestas}</b>&nbsp;Propuestas actualmente</span>
                                                
                                            </Card>

                                        </div>
                                    </div>
                                    
                                </>
                            </div>
                        </div>
                        <div className="card border-primary mb-3 mt-3">
                            <div className="card-header text-center text-dark bg-transparent">
                                <h4>Oferta recibida</h4>
                            </div>
                            <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                        <div className="card border-primary mb-3 mt-3">
                            <div className="card-header text-center text-dark bg-transparent">
                                <h4>Intercambios propuestos</h4>
                            </div>
                            <div className="card-body">
                                {
                                    offers.map((offer) => {
                                        return (
                                            <div key={offer.id} className="field-checkbox">
                                                <Checkbox inputId={offer.id} name="category" value={offer} onChange={onOfferChange} checked={selectedOffers.some((item) => item.titulo === offer.titulo)}  />
                                                <div className="card-group">
                                              
                                                        <div className="card-img-flex">
                                                            <img src={offer.imagen} width="100px"/ >
                                                        </div>
                                                        <div className="card border-light">
                                                            <h5 htmlFor={offer.titulo}>{offer.titulo}</h5>
                                                            <br/>
                                                            <p>
                                                                {offer.categoria}<br/>
                                                                {offer.estado_item}<br/>
                                                                {offer.descripcion}<br/>
                                                            </p>

                                                        </div>
                                                 
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

            </>
            )
        }
        else{            
            return (
                <div className='flex'>
                    <ProgressSpinner/> 
                </div> 
            )
        }
        
    }   

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
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

    useEffect(() => {
        (async () => {
            setLoading(true)
            let resultado = await requestOfferInfo(id);
            let respuesta = resultado.myPost
            let objetoImagen = {"itemImageSrc":respuesta.imagen, "alt":"No salio la imagen", "title":"Titulo de la imagen"};
            ima.push(objetoImagen);
            SetImagenPublicacion(ima);
            setDatos(respuesta);
            if (respuesta.subcategoria != null){
                setSubcategoryText(", "+respuesta.subcategoria)
            }
            setOffers(resultado.exchanges);
            setSelectedOffers(resultado.exchanges);
            setLoading(false)
        })();
    },[]);


    return(
        <>
            <div>
                <Loading />
            </div>   
        </>
    );
}

export default Offer