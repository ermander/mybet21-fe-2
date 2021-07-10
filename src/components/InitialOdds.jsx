import React, { useState, useEffect } from "react";
import "../styles/_initial-odds.scss";

function InitialOdds(props) {
  const [infoType, setInfoType] = useState("");
  useEffect(() => {
    setInfoType(props.info.infoType);
  }, [infoType]);

  if (infoType === "1X2") {
    return (
      <div id="oneXTwo-container">
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
  } else if (infoType === "U/O") {
    return (
      <div className="UO-GGNG-container">
        <div className="odds-info-container">
          <p>Under</p>
          <p>{props.info.underHistory}</p>
          <p>{props.info.under}</p>
        </div>
        <div className="odds-info-container">
          <p>Over</p>
          <p>{props.info.overHistory}</p>
          <p>{props.info.over}</p>
        </div>
      </div>
    );
  } else if (infoType === "GG/NG") {
    return (
      <div className="UO-GGNG-container">
        <div className="odds-info-container">
          <p>Goal</p>
          <p>{props.info.goalHistory}</p>
          <p>{props.info.goal}</p>
        </div>
        <div className="odds-info-container">
          <p>NoGoal</p>
          <p>{props.info.noGoalHistory}</p>
          <p>{props.info.noGoal}</p>
        </div>
      </div>
    );
  } else {
    return <p>Non Disponibile</p>;
  }
}

export default InitialOdds;
