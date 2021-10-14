import React from "react";
import Header from "../Header";

const UniversalLayout = ({ children, fluidWidth, hideDataTab }) => {
  return (
    <React.Fragment>
      <Header hideDataTab={hideDataTab} />
      <div className="main-content_body d-flex align-items-start">
        <div className={fluidWidth ? `container-fluid m-0 p-0` : "container mt-2"}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UniversalLayout;
