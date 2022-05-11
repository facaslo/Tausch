import React from "react";
import './General-container.css'
import Gallery from "../components/Gallery";

function Home () {
    return(
        <>
            <div className="general-container">
                <div className="page-container">
                    <div className="flex justify-content-center">
                        < Gallery />
                    </div>
                </div>
            </div>            
        </>
    );
}

export default Home