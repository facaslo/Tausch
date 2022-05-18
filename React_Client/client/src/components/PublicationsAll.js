import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

function PublicationsAll () {
    const [lastTenPublications, setLastTenPublications] = useState([]);    
    const [filter, setFilter] = useState(lastTenPublications);
    const [onLoad, setOnload] = useState(true);   

    const requestLastTenPublicationsToServer = async () => {
        return await fetch(`http://localhost:3080/getLastTen`,{            
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },            
        })
        .then((response) => response.json()).catch(error=> console.log(error));
    };

    useEffect(()=>{                
        (async () =>{
          if(onLoad){ setOnload(false);    

            let result = await requestLastTenPublicationsToServer().then(data=> data);
            let imagenes = []
            let id = 0
                      
            for(let publicacion in result){              
                
                let imagen = {"id": result[publicacion].id, "itemImageSrc": result[publicacion].imagen, "titulo": result[publicacion].titulo, "descripcion": result[publicacion].descripcion, "categoria": result[publicacion].categoria}
                imagenes.push(imagen)
                //imagenes = [...imagenes, imagen]
            }    
            
            setLastTenPublications(imagenes)            
            //itemImageSrc
          }        
        })();    
    })

    const Loading = () => {
        return (
            <>
                <div className='col-md-2'>
                    <Skeleton height={150} />
                </div>
                <div className='col-md-2'>
                    <Skeleton height={150} />
                </div>
                <div className='col-md-2'>
                    <Skeleton height={150} />
                </div>
                <div className='col-md-2'>
                    <Skeleton height={150} />
                </div>
            </>
        )
    } 

    const FilterIma = (cat) => { 
        const updatedList = lastTenPublications.filter((x)=>x.categoria === cat);
        setFilter(updatedList);
    }
    
    const Filters = () => {
        return (
            <>
                <div className='buttons btn-group-horizontal justify-content-center mb-4 pb-5'>
                    <button className='btn btn-outline-dark btn-lg' onClick={() => setFilter(lastTenPublications)}>Todas</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Arte")}>Arte</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Deportes")}>Deportes</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Entretenimiento")}>Entretenimiento</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Hogar")}>Hogar</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Libros y Revistas")}>Libros y Revistas</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Música")}>Música</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Otros")}>Otros</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Ropa y accesorios")}>Ropa y accesorios</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Servicios")}>Servicios</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => FilterIma("Tecnología")}>Tecnología</button>
                </div>
                {filter.map((item) => {
                    return(
                        <>
                            <div className='col-md-3 mb-4'>
                                <div className="card h-100 text-center shadow p-2 rounded" key={item.id}>
                                    <img src={item.itemImageSrc} className='img-fluid mx-auto d-block rounded' alt={item.titulo} width={400} height={400}/>
                                    <div className='card-body'>
                                        <h5 className='car-title mb-2'>{item.titulo}</h5>
                                        <p className='card-text'>{item.descripcion.substring(0,22)}...</p>
                                        <Link to = {`/publicaciones/${item.id}`} className="btn btn-outline-dark">
                                            Ver publicación
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-16 mb-2'>
                        <h1 className='display-6 fw-bolder text-center'>
                            Publicaciones
                        </h1>
                        <hr />
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {onLoad ? <Loading/> : <Filters/>}
                </div>
            </div>
        </>
    )
}

export default PublicationsAll