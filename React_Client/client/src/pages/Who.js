import React from "react";
import './General-container.css'

function Who () {
    return(
        <>
            <div className="general-container">
                <div className="card border-light d-block">
                    <div className="card-body">
                        <h1 className="card-title fw-bold">Quiénes somos</h1>
                        <h5 className="card-text pt-3 text-center w-75 mx-auto">
                            Somos un grupo de estudiantes de la Universidad Nacional de Colombia que buscan fomentar la actividad del trueque. <br/><br/>
                        </h5>
                        <h5 className="card-text text-justify w-75 mx-auto">
                            <span class="capitalLetter">T</span>ausch es una aplicación web que busca darle una segunda oportunidad a los artículos que la gente ya no usa y están recogiendo polvo
                            en algún armario o ático. La aplicación ofrece un sistema de trueque similar a marketplace donde oferentes pueden crear publicaciones con la información del artículo
                            que ofrecen y aquellos que buscan, y los interesados podrán comunicarse con él y pactar los términos del trueque.
                        </h5>
                    </div>
                </div>
                <section>
                    <div className="card border-light">
                        <div className="row justify-content-md-center">
                            <div className="col-md-4 mb-5 mb-md-0">
                                <div className="card testimonial-card shadow">
                                    <div className="card-up" id="one" ></div>
                                    <div className="avatar mx-auto bg-white">
                                        <img src="\images\Fabian.jpeg" className="rounded-circle img-fluid" style={{width:'210px', height:'220px'}}/>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">Fabian Castro</h4>
                                        <hr />
                                        <h5 className="dark-grey-text mt-4">
                                            Desarrollador fullstack.
                                            <br/>
                                            fccastrol@unal.edu.co
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5 mb-md-0">
                                <div className="card testimonial-card shadow">
                                    <div className="card-up" id="two" ></div>
                                    <div className="avatar mx-auto bg-white">
                                        <img src="\images\Yuli.jpeg" className="rounded-circle img-fluid" style={{width:'210px', height:'220px'}} />
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">Yuli Beltrán</h4>
                                        <hr />
                                        <h5 className="dark-grey-text mt-4">
                                            Desarrolladora fullstack.
                                            <br/>
                                            yybeltranr@unal.edu.co
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card border-light">
                        <div className="row text-center">
                            <div className="col-md-4 mb-0">
                                <div className="card testimonial-card shadow">
                                    <div className="card-up" id="three" ></div> 
                                    <div className="avatar mx-auto bg-white">
                                        <img src="\images\Scass.jpeg" className="rounded-circle img-fluid" style={{width:'210px', height:'220px'}}/>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">Santiago Cassiano</h4>
                                        <hr />
                                        <h5 className="dark-grey-text mt-4">
                                            Desarrollador fullstack.
                                            <br/>
                                            scassiano@unal.edu.co
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-0">
                                <div className="card testimonial-card shadow">
                                    <div className="card-up" id="four" ></div> 
                                    <div className="avatar mx-auto bg-white">
                                        <img src="\images\julio.jpg" className="rounded-circle img-fluid" style={{width:'210px', height:'220px'}}/>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">Julio Bedoya</h4>
                                        <hr />
                                        <h5 className="dark-grey-text mt-4">
                                            Desarrollador fullstack.
                                            <br/>
                                            jubedoyag@unal.edu.co    
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-0">
                                <div className="card testimonial-card shadow">
                                    <div className="card-up" id="five" ></div> 
                                    <div className="avatar mx-auto bg-white">
                                        <img src="\images\SRC.jpeg" className="rounded-circle img-fluid" style={{width:'210px', height:'220px'}} />
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title mb-4">Santiago Rodríguez</h4>
                                        <hr />
                                        <h5 className="dark-grey-text mt-4">
                                            Desarrollador fullstack.
                                            <br/>
                                            sarodriguezca@unal.edu.co
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Who