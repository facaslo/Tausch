import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from 'react-paginate'


function PublicationsAll () {
    const [publicationList, setPublicationList] = useState([]);    
    const [category, setCategory] = useState('all');
    const [onLoad, setOnload] = useState(true);    
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [selectedPage, setSelectedPage] = useState(1);

    useEffect(()=> {}, [onLoad,publicationList,numberOfPages])

    // Hook loads on first render only
    useEffect(()=>{    
        setOnload(false); 
        getItemsFromCategory();                
        }, [] )            
    
    useEffect(()=> {
        if(!onLoad){            
            getItemsFromCategory();
        }        
        } , 
        [selectedPage, pageSize])
        
    useEffect(() =>{
        if(!onLoad){            
            if(selectedPage!==1)
                setSelectedPage(1);
            else    
                getItemsFromCategory();
        }
        }, [category])
    
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
    
    const getItemsFromCategory = async () => {       
        
        let queryCategory = category.replace(' ', '+')
        let result = await fetch(`http://localhost:3080/publication_list?page=${selectedPage}&limit=${pageSize}&category=${queryCategory}`,{            
            method : 'GET',      
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },            
        })
        .then((response) => response.json()).catch(error=> console.log(error));
        
        let imagenes = []
                                 
        for(let publicacion in result.posts){              
            
            let imagen = {"id": result.posts[publicacion].id, "itemImageSrc": result.posts[publicacion].imagen, "titulo": result.posts[publicacion].titulo, "descripcion": result.posts[publicacion].descripcion, "categoria": result.posts[publicacion].categoria}
            imagenes.push(imagen)                 
        }
        
        setPublicationList(imagenes)                                
        let howManyPages = Math.floor(result.numberOfRows/pageSize) + 1 
        setNumberOfPages(howManyPages);

        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }
    
    
    const Filters = () => {
        return (
            <>                
                <div className='buttons btn-group-horizontal justify-content-center mb-4 pb-5'>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory('all')}>Todas</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Arte")}>Arte</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Deportes")}>Deportes</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Entretenimiento")}>Entretenimiento</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Hogar")}>Hogar</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Libros y revistas")}>Libros y revistas</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Música")}>Música</button>                    
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Otros")}>Otros</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Ropa y accesorios")}>Ropa y accesorios</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Servicios")}>Servicios</button>
                    <button className='btn btn-outline-dark btn-lg me-2' onClick={() => setCategory("Tecnología")}>Tecnología</button>
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

                    <ReactPaginate pageCount={numberOfPages} pageRangeDisplayed={3}
                    marginPagesDisplayed={2} breakLabel='...' previousLabel='<' nextLabel='>' 
                    onPageChange={(event) => { setSelectedPage(event.selected+1)}}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                    renderOnZeroPageCount={null}
                    />

                </div>
            </div>
        </>
    )
}

export default PublicationsAll