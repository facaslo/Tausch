import React from "react";
import './General-container.css'
import PublicationsAll from "./PublicationsAll";

function Home () {
    return(
        <>
            <div className="general-container">
                <div className="page-container">
                    <div className="flex justify-content-center">
                        < PublicationsAll />
                    </div> 
                </div>
            </div>            
        </>
    );
}

export default Home