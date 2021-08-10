import React, { useState, useEffect } from "react";
import "../styles/_initial-odds.scss";

function InitialOdds(props) {
  const [infoType, setInfoType] = useState("");
  useEffect(() => {
    console.log(props.complementaryData)
    setInfoType(props.complementaryData.infoType);
  }, [infoType]);

  if (infoType === "1X2") {
    return (
      <div id="oneXTwo-container">
        <div className="odds-info-container">
          <p>1</p>
          <p>{props.complementaryData.oneHistory}</p>
          <p>{props.complementaryData.one}</p>
        </div>
        <div className="odds-info-container">
          <p>X</p>
          <p>{props.complementaryData.xHistory}</p>
          <p>{props.complementaryData.x}</p>
        </div>
        <div className="odds-info-container">
          <p>2</p>
          <p>{props.complementaryData.twoHistory}</p>
          <p>{props.complementaryData.two}</p>
        </div>
      </div>
    );
  } else if (infoType === "U/O") {
    return (
      <div className="UO-GGNG-container">
        <div className="odds-info-container">
          <p>Under</p>
          <p>{props.complementaryData.underHistory}</p>
          <p>{props.complementaryData.under}</p>
        </div>
        <div className="odds-info-container">
          <p>Over</p>
          <p>{props.complementaryData.overHistory}</p>
          <p>{props.complementaryData.over}</p>
        </div>
      </div>
    );
  } else if (infoType === "GG/NG") {
    return (
      <div className="UO-GGNG-container">
        <div className="odds-info-container">
          <p>Goal</p>
          <p>{props.complementaryData.goalHistory}</p>
          <p>{props.complementaryData.goal}</p>
        </div>
        <div className="odds-info-container">
          <p>NoGoal</p>
          <p>{props.complementaryData.noGoalHistory}</p>
          <p>{props.complementaryData.noGoal}</p>
        </div>
      </div>
    );
  } else {
    return <p>Non Disponibile</p>;
  }
}

export default InitialOdds;
