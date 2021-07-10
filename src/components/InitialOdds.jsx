import React from "react";

function InitialOdds(props) {
  console.log(props);
  if (props.infoType === "1X2") {
    return (
      <div id="main-container">
        <div className="odds-info-container">
          <p>{props.oneHistory}</p>
          <p>{props.xHistory}</p>
          <p>{props.twoHistory}</p>
        </div>
        <div className="odds-info-container">
          <p>one</p>
          <p>b</p>
          <p>a</p>
        </div>
      </div>
    );
  }
}

export default InitialOdds;
