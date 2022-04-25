import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';
import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
//import { Avatar } from 'primereact/avatar';
//<Avatar image="../images/look.png" size="xlarge" shape="circle" className="mx-2" />
//<Avatar image="../images/look.png" size="xlarge" shape="circle" className="mx-1" />
import { Image } from 'primereact/image';
import ReactFinalFormDemo  from './FormularioRegistro.js';
import ReactFormLogin  from './FormularioLogin.js';
import './TabViewD.css';


function TabViewDemo (){
        const tabHeaderHomeTemplate = (options) => {
            return (
                <div className="flex align-items-center px-2" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                    <Image src="images/home.png" alt="Image1" width="25" />                    
                </div>
            )
        };
        const tabHeaderBuscarTemplate = (options) => {
            return (
                <div className="flex align-items-center px-2" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                    <Image src="images/look.png" alt="Image2" width="25" />
                </div>
            )
        };

        return (
            <div className="tabview-demo">
                <div className="card">
                    <TabView scrollable> 
                        <TabPanel headerTemplate={tabHeaderHomeTemplate} headerClassName="flex align-items-center">
                            <p>En construcción... </p>
                        </TabPanel>
                        <TabPanel header="Quiénes somos">
                            <p>Somos un grupo de estudiantes de la Universidad Nacional de Colombia que buscan fomentar la actividad del trueque. <br/>
                            Tausch es una aplicación web que busca darle una segunda oportunidad a los artículos que la gente ya no usa y están recogiendo polvo en algún armario o ático. La aplicación ofrece un sistema de trueque similar a marketplace donde oferentes pueden crear publicaciones con la información del artículo que ofrecen y aquellos que buscan, y los interesados podrán comunicarse con él y pactar los términos del trueque.
                            </p>
                        </TabPanel>
                        <TabPanel header="Cómo funciona">
                            <p>Publica los items o servicios que deseas intercambiar y espera a que alguien ofrezca algo que te interese o también puedes ser tú quien vaya a la busca de artículos de tu interés. En cualquier caso, Tausch te facilitará ponerte en contacto con la otra persona.</p>
                        </TabPanel>
                        <TabPanel header="Inicia sesión">
                            <ReactFormLogin />
                        </TabPanel>
                        <TabPanel header="Regístrate gratis"  >                            
                            <ReactFinalFormDemo />
                        </TabPanel>
                        <TabPanel header="Comunidad">
                            <p>En construcción... </p>
                        </TabPanel>                        
                        <TabPanel headerTemplate={tabHeaderBuscarTemplate} headerClassName="flex align-items-center">
                            <p>En construcción...</p>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        )
    }
                    
export default TabViewDemo