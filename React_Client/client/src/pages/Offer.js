import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primeicons/primeicons.css';
import { Checkbox } from 'primereact/checkbox';
import { Galleria } from 'primereact/galleria';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "./General-container.css"
import './Publication.css'; //Aqui esta el no-display
import ContactInformation from '../components/ContactInformation';
import Modal from '../components/Modal';

function Offer () {
    
    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [isAuthenticated, setisAuthenticated] = useState(false);

    //Estado para saber si el usuario actual es el que realizo la oferta
    const [isOferente, setIsOferente] = useState(false);

    //Estado para saber si el usuario actual es el que recibio la oferta
    const [isReceptor, setIsReceptor] = useState(false);

    //Recibir el id de la oferta
    const {id} = useParams();

    const [id_pub_receptor, setId_pub_receptor] = useState();
    const [loading, setLoading] = useState(true);  

    const [datos, setDatos] = useState({});
    const [imagenPublicacion, SetImagenPublicacion] = useState([]);
    const [subcategoryText,setSubcategoryText]=useState("");

    const[stateContactInfo, setStateContactInfo]=useState(false)

    let ima=[]

    //Intentos
    //const categories = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];
    const [offers, setOffers] = useState([]);
    const [selectedOffers, setSelectedOffers] = useState([]);

    //Datos de la oferta
    const [datosOferta, setDatosOferta] = useState({});

    //Hook para mensaje de confirmacion de aceptado
    const [showAcceptedMessage, setShowAcceptedMessage] =useState(false);
    //Hook para mensaje de confirmacion de rechazado
    const [showDeclineMessage, setShowDeclineMessage] =useState(false);
    //Hook para mensaje de confirmacion de cancelado
     const [showCancelMessage, setShowCancelMessage] =useState(false);
    //Hook para mensaje de confirmacion de confirmado
    const [showConfirmMessage, setShowConfirmMessage] =useState(false);
    //Hook para mensaje de confirmacion de confirmado
    const [showNotSelectedMessage, setShowNotSelectedMessage] =useState(false);

    const onOfferChange = (e) => {
        let _selectedOffers = [...selectedOffers];

        if (e.checked) {
            _selectedOffers.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedOffers.length; i++) {
                const selectedOffer = _selectedOffers[i];

                if (selectedOffer.id === e.value.id) {
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
        })
        .then((response) => response.json()).catch(error=> console.log(error));
    };


    const acceptOffer = async(id) => {
        let notSelectedOffers = offers.filter(element => {return selectedOffers.indexOf(element) ===-1 });
        notSelectedOffers = notSelectedOffers.map(offer => offer.id);
         
        let idsPublications=([...selectedOffers.map(offer => offer.id),datos.id])

        if(selectedOffers.length > 0){
            //Si se selecciono al menos una publicacion de la oferta
            setShowAcceptedMessage(true);
            const url = "http://localhost:3080/accept-offer";
            return await fetch(url,{
                method : 'PUT',
                headers:{
                    token: localStorage.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({idOffer: id, notSelectedOffers:notSelectedOffers, idsPublications:idsPublications})
            })
            .then((response) => response.json()).catch(error=> console.log(error));
        } else {

            //Si no se selecciono ninguna publicacion
            setShowNotSelectedMessage(true);
        }
    };

    const declineOffer=async(id)=>{

        setShowDeclineMessage(true);
        const url = "http://localhost:3080/decline-offer";
        return await fetch(url,{
            method : 'PUT',
            headers:{
                token: localStorage.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({idOffer: id})
        })
        .then((response) => response.json()).catch(error=> console.log(error));

    }
    const cancelOffer=async(id)=>{

        let idsPublications=([...selectedOffers.map(offer => offer.id),datos.id])
        setShowCancelMessage(true);
        const url = "http://localhost:3080/cancel-offer";
        return await fetch(url,{
            method : 'POST',
            headers:{
                token: localStorage.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({idOffer: id, idsPublications:idsPublications})
        })
        .then((response) => response.json()).catch(error=> console.log(error));

    }

    const confirm=async(id, user)=>{
        let url

        setShowConfirmMessage(true);
        if (user==='proponente'){
            url = "http://localhost:3080/conf-proponent";
        }
        else if(user='receptor'){
            url = "http://localhost:3080/conf-receptor";     
        }

        return await fetch(url,{
            method : 'PUT',
            headers:{
                token: localStorage.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({idOffer: id})
        })
        .then((response) => response.json()).catch(error=> console.log(error));

    }

    //Verificar si la token esta activa Con la funcion authorization
    //Y asi saber si hay alguien loggeado y extraer el correo de esa persona
    async function isAuth(correoReceptor, correoOferente){
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

                //Verificar si el receptor de la oferta
                if(correoReceptor === userDataJson[0].email){
                    setIsReceptor(true);
                }

                //Verificar si fue la persona que hizo la oferta
                if(correoOferente === userDataJson[0].email){
                    setIsOferente(true);
                }
            }
        } catch(err){
            console.error(err.message);
        }
    }

    const redirect= () =>{
        window.location.replace(window.location.href);
        setShowAcceptedMessage(false)
    }
    const cambiarEstadoContactInfo = () => {
        setStateContactInfo(!stateContactInfo)
    }

    const dialogFooterAccept = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"  onClick={() => redirect() } /></div>;
    const dialogFooterNotSelected = <div className="flex justify-content-center"><Button label="OK" className="p-button-text"  onClick={() => setShowNotSelectedMessage(false)} /></div>;

    const Loading = () => {
        if(loading === false){
            return (
                <>
                    <div className="general-container">
                        <Dialog visible={showAcceptedMessage} onHide={() => setShowAcceptedMessage(false)} position="top" footer={dialogFooterAccept} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex align-items-center flex-column pt-6 px-3">
                                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                                <br/>
                                <br/>
                                <h5>Has aceptado la oferta, ya puedes ver los datos del oferente para planear el trueque.</h5>
                            </div>
                        </Dialog>

                        <Dialog visible={showDeclineMessage} onHide={() => setShowDeclineMessage(false)} position="top" footer={dialogFooterAccept} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex align-items-center flex-column pt-6 px-3">
                                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                                <br/>
                                <br/>
                                <h5>Has rechazado la oferta.</h5>
                            </div>
                        </Dialog>
                        <Dialog visible={showCancelMessage} onHide={() => setShowCancelMessage(false)} position="top" footer={dialogFooterAccept} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex align-items-center flex-column pt-6 px-3">
                                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                                <br/>
                                <br/>
                                <h5>Has cancelado el trueque.</h5>
                            </div>
                        </Dialog>
                        <Dialog visible={showConfirmMessage} onHide={() => setShowConfirmMessage(false)} position="top" footer={dialogFooterAccept} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex align-items-center flex-column pt-6 px-3">
                                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                                <br/>
                                <br/>
                                <h5>Has confirmado el trueque.</h5>
                            </div>
                        </Dialog>

                        <Dialog visible={showNotSelectedMessage} onHide={() => setShowNotSelectedMessage(false)} position="top" footer={dialogFooterNotSelected} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex align-items-center flex-column pt-6 px-3">
                                <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                                <br/>
                                <br/>
                                <h5>Debes seleccionar por lo menos un producto ofertado para poder aceptar la oferta.</h5>
                            </div>
                        </Dialog>

                        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-3">
                            <div className="col m-0">
                                <div class="card border-primary h-100">
                                    <div className="card-header bg-transparent border-primary">
                                        <h4 className='text-center text-dark'><strong>Publicación de </strong> {datos.nombres} {datos.apellidos}</h4>
                                    </div>
                                    {/*<PublicationInOffer argumento_id = {id_pub_receptor}/>*/}
                                    <div className="row">
                                        <div className="col ml-2">
                                            <br />
                                            <Galleria value={imagenPublicacion} responsiveOptions={responsiveOptions} numVisible={1} style={{  maxWidth:'200px' }}
                                                    showThumbnails={false} showIndicators item={itemTemplate} circular autoPlay transitionInterval={3000} /> 
                                        </div>
                                        <div className="col">                                    
                                            <div className="card-body text-start">
                                                <h5 className="card-title"><br />{datos.titulo}</h5>
                                                <p className="card-text">{datos.categoria+subcategoryText}</p>
                                                <h5 className="text-primary" >{datos.estado_item}</h5>
                                                <span><b>Publicado: </b>&nbsp;{String (datos.fecha_publicacion).slice(0,10) }</span>
                                                <br/>
                                                <br/>
                                                <span>{datos.descripcion}</span>
                                                <br/>
                                                <br/>
                                                <span><b>{datos.numero_propuestas}</b>&nbsp;Propuestas actualmente</span>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col">
                                <div class="card border-primary h-100">
                                    <div className="card-header text-center text-dark border-primary bg-transparent">
                                        <h4><strong>Información de la Oferta</strong></h4>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title text-left"><br />Mensaje del oferente:</h5>
                                        <p className="card-text">{datosOferta.mensaje}</p>
                                        <h5 className="card-text text-primary fw-bold">Oferta {datosOferta.estadoOferta}</h5>
                                        <p className="card-text"><small className="text-muted">Fecha de la oferta: {String (datosOferta.fechaOferta).slice(0,10)}</small></p>
                                        
                                        <div className={datosOferta.estadoOferta==='concluida'? "":"no-display"}>
                                            <p className="card-text"><small className="text-muted">Fecha de finalización del trueque: {String (datosOferta.fechaTrueque).slice(0,10)}</small></p>
                                        </div>

                                        {/*BOTONES DEL RECEPTOR PARA ACEPTAR/RECHZAR OFERTA, CONFIRMAR TRUEQUE Y VER DATOS DE CONTACTO*/}
                                        <div className={isReceptor ? "":"no-display"}>
                                            
                                            {/*OFERTA EN ESPERA, BOTONES ACEPTAR/RECHAZAR PARA EL RECEPTOR*/}
                                            <div className={datosOferta.estadoOferta === "en espera" ? "":"no-display"}>
                                                <div className="row">
                                                    <div className="col-6 d-flex justify-content-center">
                                                        <Button label="Aceptar oferta" icon="pi pi-check" className="p-button-success" onClick={() => {acceptOffer(id)} } />
                                                    </div>
                                                    <div class="col-6 d-flex justify-content-center">
                                                        <Button label="Rechazar oferta" icon="pi pi-times-circle" className="p-button-danger" onClick={() => {declineOffer(id)}}/>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/*OFERTA EN ESTADO aceptada*/}
                                            <div className={datosOferta.estadoOferta === "aceptada" ? "":"no-display"}>
                                                <div className={ !datosOferta.confirmacionReceptor ? "":"no-display"}>
                                                    <p>Comunícate con la otra persona para acordar el lugar y fecha del trueque</p>
                                                </div>
                                                <div class="d-flex justify-content-center">
                                                    <Button label="Ver datos de la otra persona" icon="pi pi-search" className="p-button" onClick={(cambiarEstadoContactInfo)} />
                                                    <Modal className="contenido-modal" estado={stateContactInfo} cambiarEstado={cambiarEstadoContactInfo}><ContactInformation email={datosOferta.emailOferente}/></Modal>
                                                </div>
                                            
                                                {/*SI AUN NO CONFIRMO*/}
                                                <div className={ !datosOferta.confirmacionReceptor ? "":"no-display"}>
                                                    <br/>
                                                    <p>Una vez que hallan realizado el trueque da click en Confirmar Trueque para concluirlo, si no se llegó a un acuerdo da click a Cancelar Trueque</p>
                                                    <div class="row">
                                                        <div class="col-6 d-flex justify-content-center">
                                                            <Button label="Confirmar Trueque" icon="pi pi-sort-alt" className="p-button-success" onClick={()=>{confirm(id, 'receptor')}} />
                                                        </div>
                                                        <div class="col-6 d-flex justify-content-center">
                                                            <Button label="Cancelar Trueque" icon="pi pi-sort-alt-slash" className="p-button-danger" onClick={()=>{cancelOffer(id)}}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/*SI YA CONFIRME EL TRUEQUE PERO EL OTRO NO*/}
                                                <div className={datosOferta.confirmacionReceptor ? "":"no-display"}>
                                                    <br/>
                                                    <span className="text-danger"><p>Gracias por confirmar. Espera a que la otra persona también confirme que se realizo el trueque.</p></span>
                                                </div>
                                            </div>
                                            {/*SI LA OFERTA YA FUE CONCLUIDA o RECHAZADA NO TOCA HACER NADA*/}
                                        </div>

                                        {/*BOTONES DEL OFERENTE PARA CONFIRMAR TRUEQUE Y VER DATOS DE CONTACTO*/}
                                        <div className={isOferente ? "":"no-display"}>
                                            
                                            {/*OFERTA EN ESPERA*/}
                                            <div className={datosOferta.estadoOferta === "en espera" ? "":"no-display"}>
                                                <br/>
                                                <span className="text-danger fw-bold"><p>Espera a que {datos.nombres} {datos.apellidos} acepte tu oferta</p></span>
                                            </div>
                                            
                                            {/*OFERTA EN ESTADO aceptada BOTONES PARA CONFIRMAR/CANCELAR/VER DATOS*/}
                                            <div className={datosOferta.estadoOferta === "aceptada" ? "":"no-display"}>
                                                <div className={ !datosOferta.confirmacionOferente ? "":"no-display"}>
                                                    <p>Comunícate con la otra persona para acordar el lugar y fecha del trueque</p>
                                                </div>
                                                <div class="d-flex justify-content-center">
                                                    <Button label="Ver datos de la otra persona" icon="pi pi-search" className="p-button" onClick={(cambiarEstadoContactInfo)} />
                                                    <Modal className="contenido-modal" estado={stateContactInfo} cambiarEstado={cambiarEstadoContactInfo}><ContactInformation email={datos.email}/></Modal>
                                                </div>
                                            
                                                {/*SI AUN NO CONFIRMO*/}
                                                <div className={ !datosOferta.confirmacionOferente ? "":"no-display"}>
                                                    <br/>
                                                    <p>Una vez que hallan realizado el trueque da click en Confirmar Trueque para concluirlo, si no se llegó a un acuerdo da click a Cancelar Trueque</p>
                                                    <div class="row">
                                                        <div class="col-6 d-flex justify-content-center">
                                                            <Button label="Confirmar Trueque" icon="pi pi-sort-alt" className="p-button-success" onClick={()=>{confirm(id, 'proponente')}} />
                                                        </div>
                                                        <div class="col-6 d-flex justify-content-center">
                                                            <Button label="Cancelar Trueque" icon="pi pi-sort-alt-slash" className="p-button-danger" onClick={()=>{cancelOffer(id)}}/>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/*SI YA CONFIRME EL TRUEQUE PERO EL OTRO NO*/}
                                                <div className={datosOferta.confirmacionOferente ? "":"no-display"}>
                                                    <br/>
                                                    <span className="text-danger"><p>Gracias por confirmar. Espera a que la otra persona también confirme que se realizo el trueque.</p></span>
                                                </div>
                                            </div>
                                            {/*SI LA OFERTA YA FUE CONCLUIDA O RECHAZADA NO TOCA HACER NADA*/}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col">
                                <div class="card border-primary h-100">
                                    <div className="card-header text-center text-dark border-primary bg-transparent">
                                        <h4><strong>Productos ofrecidos por </strong>{datosOferta.nombreOferente}</h4>
                                    </div>
                                    <div className="card-body">
                                        {
                                            offers.map((offer) => {
                                                return (
                                                    <div key={offer.id} className="field-checkbox">

                                                        <div className={datosOferta.estadoOferta === "en espera" && isReceptor ? "":"no-display"}>
                                                            <Checkbox inputId={offer.id} name="category" value={offer} onChange={onOfferChange} checked={selectedOffers.some((item) => item.id === offer.id)}  />
                                                        </div>

                                                        <div className="card-group">
                                                    
                                                                <div className="card-img-flex m-2">
                                                                    <br />
                                                                    <img src={offer.imagen} width="100px" />
                                                                </div>
                                                                <div className="card border-light text-start">
                                                                    <h5 className='fw-bold ml-2' htmlFor={offer.titulo}><br />{offer.titulo}</h5>
                                                                    <p className='ml-2'>
                                                                        {offer.categoria}<br/>
                                                                        <span className="text-primary fw-bold">{offer.estado_item}</span><br/>
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
                        </div>
                    </div>
                </>
            )
        } else {            
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
            console.log(resultado);
            let respuesta = resultado.myPost
            let objetoImagen = {"itemImageSrc":respuesta.imagen, "alt":"No salio la imagen", "title":"Titulo de la imagen"};
            
            let dataOffer = {
                "mensaje":resultado.offerMsg, 
                "nombreOferente":resultado.nameOfferOwner, 
                "fechaOferta":resultado.exchanges[0].fecha_propuesta, 
                "emailOferente":resultado.exchanges[0].email_proponente,
                "estadoOferta":resultado.exchanges[0].estado_propuesta,
                "confirmacionOferente":resultado.exchanges[0].confirmacion_proponente,
                "confirmacionReceptor":resultado.exchanges[0].confirmacion_receptor,
                "fechaTrueque":resultado.exchanges[0].fecha_trueque
            };

            ima.push(objetoImagen);
            SetImagenPublicacion(ima);
            setDatos(respuesta);
            setDatosOferta(dataOffer);
            
            //Verificar si usuario actual es receptor o oferente
            await isAuth(respuesta.email, dataOffer.emailOferente);

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