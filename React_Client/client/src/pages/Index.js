import React from "react";
import './General-container.css'
import PublicationsAll from "../components/PublicationsAll";

function Home () {
    return(
        <>
            <div className="general-container">
                <div className="flex justify-content-center">
                    < PublicationsAll />
                </div>
            </div>            
        </>
    );
}

export default Home