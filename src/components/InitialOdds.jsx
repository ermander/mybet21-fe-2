import React, { useState, useEffect } from "react";
import "../styles/_initial-odds.scss"

function InitialOdds(props) {
  const [infoType, setInfoType] = useState("");
  useEffect(() => {
    setInfoType(props.info.infoType);
  }, [infoType]);

  if (infoType === "1X2") {
    return (
      <div id="main-container">
        <div className="odds-info-container">
          <p>1</p>
          <p>{props.info.oneHistory}</p>
          <p>{props.info.one}</p>
        </div>
        <div className="odds-info-container">
          <p>X</p>
          <p>{props.info.xHistory}</p>
          <p>{props.info.x}</p>
        </div>
        <div className="odds-info-container">
          <p>2</p>
          <p>{props.info.twoHistory}</p>
          <p>{props.info.two}</p>
        </div>
      </div>
    );
  }else{
      return(
          <p>ujs</p>
      )
  }
}

export default InitialOdds;
