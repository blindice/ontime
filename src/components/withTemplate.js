import React from "react";
import SideBar from "../pages/SideBar";
import CustomHeader from "./CustomHeader";

import "./withTemplate.css";

const withHeaderAndFooter = (OriginalComponent) => {
  function UpdatedComponent(props) {
    return (
      <div className="container">
        <div className="sides">
          <SideBar />
        </div>
        <div className="heads">
          <CustomHeader />
        </div>
        <div className="contents">
          <OriginalComponent />
        </div>
      </div>
    );
  }
  return UpdatedComponent;
};

export default withHeaderAndFooter;
