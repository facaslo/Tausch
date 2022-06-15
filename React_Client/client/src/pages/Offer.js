import React from "react";
//import Publication from "../Publication"

function Offer () {
    return(
        <>
            <div class="card-group">
                <div class="card border-primary mb-3 mt-3">
                    <div class="card-header text-center text-dark bg-transparent">
                        <h4>Tu publicación</h4>
                    </div>
                    <div class="card-body">
                       {/*<Publication />*/}
                    </div>
                </div>
                <div class="card border-primary mb-3 mt-3">
                    <div class="card-header text-center text-dark bg-transparent">
                        <h4>Oferta recibida</h4>
                    </div>
                    <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div class="card border-primary mb-3 mt-3">
                    <div class="card-header text-center text-dark bg-transparent">
                        <h4>Intercambios propuestos</h4>
                    </div>
                    <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Offer