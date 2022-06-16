import React from "react";

function ContactInformation () {
    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [userEmail, setUserEmail]=useState(null);
    const [datos, setDatos] = useState({});
    const [productOptions, setProductOptions]=useState([{}])

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
                const userData = await fetch("http://localhost:3080/authentication/getProfileInfo",
                {
                    method:"GET",
                    headers:{token: localStorage.token}
                });

                const userDataJson = await userData.json();
                setDatos(userDataJson[0]);
            }
        } catch(err){
            console.error(err.message);
        }
    }


    const requestPublicationsList= async() => {
        const url = "http://localhost:3080/user-posts";
        return await fetch(url,{            
            method : 'GET',
            headers:{token: localStorage.token}           
        })
        .then((response) => response.json()).catch(error=> console.log(error));
        
    };

    useEffect(() => {
        (async () => {
            isAuth();
            let respuesta = await requestPublicationsList();
            let publications=[]
            for (const pub of respuesta.posts){
                publications.push(pub)
            }
            setProductOptions(publications)
            console.log(productOptions)
        })();
    },[]);

    {/*const activarcaja = () => {
        document.getElementById('basic-addon1').disabled=true
    }*/}

    return(
        <>
            <div className="general-container">
                <div className="card border-light d-block my-auto">
                    <div className="card-body">
                        <h5 className="card-title">Información de contacto</h5>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FaPhoneAlt size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.celular} aria-label="Celular" aria-describedby="basic-addon1" keyfilter={/^\d{0,10}$/} disabled=""/>
                            <button  type="input-group-text" onClick="" ><FaEdit /></button>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2"><FaFacebook size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.facebook} aria-label="Facebook" aria-describedby="basic-addon2" disabled=""/>
                            <button  type="input-group-text" onClick="" ><FaEdit /></button>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon3"><FaInstagramSquare size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.instagram} aria-label="Instagram" aria-describedby="basic-addon3" disabled=""/>
                            <button  type="input-group-text" onClick="" ><FaEdit /></button>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon4"><FaTwitter size={20}/></span>
                            <input type="text" className="form-control" placeholder={datos.twitter} aria-label="Twitter" aria-describedby="basic-addon4" disabled=""/>
                            <button  type="input-group-text" onClick="" ><FaEdit /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactInformation