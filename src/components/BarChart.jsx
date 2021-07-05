import React from "react";
import { Chart, Lines, Dots, Labels, Ticks, Layer } from "rumble-charts";

export default function BarChart() {
    const series = [{
        name: 'John',
        data: [1, 2, 3]
      }]
    return (
        <div>
        <Chart width={600} height={250} series={series} minY={0}>
          <Layer width="80%" height="90%" position="top center">
            <Lines />
            <Dots />
            <Labels
              label={({ point }) => +point.y}
              dotStyle={{
                textAnchor: "middle",
                dominantBaseline: "text-after-edge",
                fontFamily: "sans-serif",
                fontSize: "0.8em",
              }}
              labelAttributes={{
                y: -4,
              }}
            />
            <Ticks
              axis="y"
              lineLength="100%"
              lineVisible={true}
              lineStyle={{ stroke: "lightgray" }}
              labelStyle={{
                textAnchor: "end",
                dominantBaseline: "middle",
                fill: "lightgray",
              }}
              labelAttributes={{ x: -5 }}
            />
          </Layer>
        </Chart>
      </div>
    )
}
