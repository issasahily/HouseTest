import React from "react";

import "./BackDrop.css";
const BackDrop = (props) => {
  const cssClass = ["BackDrop", props.show ? "BackdropOpen" : "BackdropClose"];

  return <div className={cssClass.join(" ")}></div>;
};

export default BackDrop;
