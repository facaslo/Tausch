import React from "react";
import { Image } from 'primereact/image';
import './General-container.css'

function How () {
    let x = 1;
    return(
        <>
            <div className="general-container">
                <div className="card border-light d-block mx-4">
                    <div class="card-header bg-transparent border-light">
                        <h1 className="card-title fw-bold">Cómo funciona</h1><br />
                    </div>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img className="imgHow rounded mx-auto" src="\images\Llave.jpg" alt="llave" />
                        </div>
                        <div class="col-md-8">
                            <div className="card-body mt-3 m-2">
                                <h5 className="card-text text-justify">
                                    <span className="capitalLetter">T</span>ausch, 
                                    <div className="waviy">
                                        {/*}
                                        <span style="--i:1">t</span><span style="--i:2">u </span>
                                        <span style="--i:3">l</span><span style="--i:4">l</span><span style="--i:5">a</span><span style="--i:6">v</span><span style="--i:7">e </span>
                                        <span style="--i:8">a </span>
                                        <span style="--i:9">l</span><span style="--i:10">o </span>
                                        <span style="--i:11">q</span><span style="--i:12">u</span><span style="--i3">e </span>
                                        <span style="--i:14">b</span><span style="--i:15">u</span><span style="--i:16">s</span><span style="--i:17">c</span><span style="--i:18">a</span><span style="--i:19">s</span>*/}
                                        {/*<span style={{ animationDelay: --i }} > t</span>
                                        <span style={{ animationDelay: --i+1 }} > u</span>*/}
                                        <span style={{ var:1}} > y </span>
                                        <span style={{ var:2 }} > u</span>
                                    </div>
                                    tu llave a lo que buscas,  es una aplicación web que te permite intercambiar artículos que ya no usas
                                    u ofrecer tus servicios a cambio de aquellos otros servicios o artículos que necesitas o quieres, 
                                    <span className="text-primary fw-bold"> sin gastar dinero. </span>
                                    Para poder ofrecer productos o servicios y realizar intercambios deberás estár registrado en la página.
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div className="card-body m-2">
                                <h5 className="card-text text-justify pt-4">
                                    <span className="capitalLetter">U</span>na vez registrado, accedes a tu sesión y podrás publicar los items o servicios que deseas intercambiar,
                                    luego esperas a que alguien te ofrezca artículos o servicios por esa publicación. Una vez te realicen una oferta podrás aceptar alguno o todos los artículos que 
                                    te ofrezcan para así comunicarte con el oferente y pactar el intercambio. <br /><br />
                                    Si la oferta que te hacen no te parece tentadora, podrás rechazarla.<br / ><br />
                                    También puedes ser tú quien se sumerja en la búsqueda de artículos de tu interés, observando todas las publicaciones o filtrando según la categoría
                                    que prefieras. En cualquier caso, Tausch te facilitará ponerte en contacto con la otra persona para realizar tu trueque.
                                </h5>
                            </div>
                        </div>
                        <div class="col-md-4 pt-5">
                            <img className="imgHow rounded mx-auto" src="\images\Negociar.jpg" alt="negociar" />
                        </div>
                    </div>
                </div>
            
            </div>
        </>
    );
}

export default How