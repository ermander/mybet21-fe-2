import React from "react";
import { Chart } from "react-google-charts";

function Prova({data}) {
  return (
    <div>
      <Chart
        width={"300px"}
        height={"200px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[data]}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default Prova;
