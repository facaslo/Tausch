import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";


function PublicationsAll ({all}) {
    const [publicationList, setPublicationList] = useState([]);    
    const [category, setCategory] = useState({all});
    const [onLoad, setOnload] = useState(true)

    const requestpublicationListToServer = async () => {
        return await fetch(`http://localhost:3080/publication_list?page=1&limit=12&category=`,{            
            method : 'GET',            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },            
        })
        .then((response) => response.json()).catch(error=> console.log(error));
    };

    useEffect(()=>{                
        if(onLoad){
            setOnload(false); 
        }})
    
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

    const getItemsFromCategory = async (category) => {        
        
        let queryCategory = category.replace(' ', '+')
        let result = await fetch(`http://localhost:3080/publication_list?page=1&limit=12&category=${queryCategory}`,{            
            method : 'GET',            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },            
        })
        .then((response) => response.json()).catch(error=> console.log(error));
        
        let imagenes = []
                                 
        for(let publicacion in result){              
            
            let imagen = {"id": result[publicacion].id, "itemImageSrc": result[publicacion].imagen, "titulo": result[publicacion].titulo, "descripcion": result[publicacion].descripcion, "categoria": result[publicacion].categoria}
            imagenes.push(imagen)            
        
        setPublicationList(imagenes)
        
        }
    }
    
    const Filters = () => {
        return (
            <>
                <div className='buttons btn-group-horizontal justify-content-center mb-4 pb-5'>
                    <button className='btn btn-outline-dark btn-lg' onClick={() => getItemsFromCategory('all')}>Todas</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Arte")}>Arte</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Deportes")}>Deportes</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Entretenimiento")}>Entretenimiento</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Hogar")}>Hogar</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Libros y revistas")}>Libros y revistas</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Música")}>Música</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Otros")}>Otros</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Ropa y accesorios")}>Ropa y accesorios</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Servicios")}>Servicios</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => getItemsFromCategory("Tecnología")}>Tecnología</button>
                </div>
                {publicationList.map((item) => {
                    return(
                        <>
                            <div className='col-md-3 mb-4'>
                                <div className="card h-100 text-center shadow p-2 rounded" key={item.id}>
                                    <img src={item.itemImageSrc} className='img-fluid mx-auto d-block rounded' alt={item.titulo} width={400} height={400}/>
                                    <div className='card-body'>
                                        <h5 className='car-title mb-2'>{item.titulo}</h5>
                                        <p className='card-text'>{item.descripcion.substring(0,22)}...</p>
                                        <Link to = {`/publication/${item.id}`} className="btn btn-outline-dark">
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