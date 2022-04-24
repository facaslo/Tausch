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
                    <TabView>
                        <TabPanel headerTemplate={tabHeaderHomeTemplate} headerClassName="flex align-items-center">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </TabPanel>
                        <TabPanel header="Quiénes somos">
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                        </TabPanel>
                        <TabPanel header="Cómo funciona">
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.</p>
                        </TabPanel>
                        <TabPanel header="Inicia sesión">
                            <ReactFormLogin />
                        </TabPanel>
                        <TabPanel header="Regístrate gratis"  >                            
                            <ReactFinalFormDemo />
                        </TabPanel>
                        <TabPanel header="Comunidad">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        </TabPanel>                        
                        <TabPanel headerTemplate={tabHeaderBuscarTemplate} headerClassName="flex align-items-center">
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti .</p>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        )
    }
                    
    //const rootElement = document.getElementById("root");
    //ReactDOM.render(<TabViewDemo />, rootElement);
export default TabViewDemo