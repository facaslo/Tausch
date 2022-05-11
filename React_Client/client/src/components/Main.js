import React from "react";
import Gallery from "./Gallery";

const Main = () => {
    return(
        <>
          <div className="general-container">
              <div className="page-container">
              <h1>Home</h1>
                  <Gallery />
              </div>
          </div>
        </>
        
    );
}

export default Main