import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function Activation() {    
    const [activationParams, setActivationParams] = useSearchParams();
    const [showMessage, setShowMessage] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState("La cuenta ha sido activada");
    const [onLoad, setOnload] = useState(true);

    const sendActivationToServer = async (data) => {
      return await fetch(`http://localhost:3080/activate`,{            
          method : 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then((response) => response.json()).catch(error=> console.log(error));
    };
    
    
    useEffect(()=>{
      let user = activationParams.get("user");
      let token = activationParams.get("token"); 
      
      (async () =>{
        if(onLoad){
          let result = await sendActivationToServer({"userName": user, "token": token}).then(data=> data);
          setOnload(false);
          console.log(result);
          if(result.activationSuccess){
            setTimeout(()=>setShowMessage(true),5000)
          }else{
            setSuccessMessage("Token o nombre de usuario incorrectos");
            setTimeout(()=>setShowMessage(true),5000);
          }
        }        
      })();    
    })   

    const footer = (
      <div>
          <Button label="Entendido" icon="pi pi-check" onClick={()=>window.location.href = "http://localhost:3000/"} />          
      </div>
    );
    
    
    return (    
      <div className='main'>
        <h2> Estamos activando tu cuenta, espera unos segundos </h2>       

      

      <Dialog header="Alerta" visible={showMessage} style={{ width: '50vw' }} footer={footer} onHide={() => setShowMessage(false)}>
          <p> {SuccessMessage} </p>
      </Dialog>
      </div>
    );
}