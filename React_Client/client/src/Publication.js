import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';


import React, { useState } from 'react';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Galleria } from 'primereact/galleria';





function Publication (){//aquí recibiría un objeto?
   
   let datos= ({
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

let ima=[
    {"itemImageSrc": "images/z2.png","alt": "z2","title": "Title 1"},
    {"itemImageSrc": "images/z3.png","alt": "z3","title": "Title 2"},
    {"itemImageSrc": "images/z.jpg","alt": "z1","title": "Title 0"}
]
    
    //const [images, setImages] = useState(null);
    

    
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
            <div className="flex align-items-center justify-content-center">
                
               
                
                
                <Galleria value={ima} responsiveOptions={responsiveOptions} numVisible={5} style={{  maxWidth:'600px' }}
                showThumbnails={false} showIndicators item={itemTemplate} circular autoPlay transitionInterval={3000}/>
            
           


                <Divider layout="vertical" />
                

                <Card title={datos.title} subTitle={datos.category+", "+datos.subcategory}>
                    <p className="flex justify-content-start text-primary" >{datos.item_state}</p>
                    <span className="flex justify-content-start" ><b>Publicado: </b>&nbsp;{datos.publication_date +" por "+ datos.name+" "+datos.last_name}</span>
                    <br/>
                    <br/>
                    <span className="flex justify-content-start">{datos.description}</span>
                    <br/>
                    <br/>
                    <span className="flex justify-content-start"><b>Intercambio por:</b>&nbsp;{datos.exchange_for}</span>
                    <span className="flex justify-content-start"><b>{datos.proposal_number}</b>&nbsp;Propuestas actualmente</span>
                    <br/>
                    <br/>
                    <Button label="Hacer propuesta" icon="pi pi-comments" />
                    <Button label="Eliminar publicación" icon="pi pi-times-circle" className="p-button-danger"/>{/*la idea es que solo aparezca un boton depende del usuario*/}
                </Card>

            </div>
        </div>
    );


}

export default Publication