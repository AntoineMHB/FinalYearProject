import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const NbchartsLinechatsByAnima = (): JSX.Element => {
  // Data for the chart
  const yAxisLabels = [
    { value: "100", top: 0 },
    { value: "75", top: 35 },
    { value: "50", top: 70 },
    { value: "25", top: 105 },
    { value: "0", top: 140 },
  ];

  const xAxisLabels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dataPoints = [
    { top: 83, left: -0.5 },
    { top: 55, left: 61 },
    { top: 26, left: 123 },
    { top: -0.5, left: 186 },
    { top: 69, left: 249 },
    { top: 40, left: 312 },
    { top: 12, left: 374 },
  ];

  return (
    <Card className="w-full h-[182px] relative">
      <CardContent className="p-0">
        <div className="relative w-full h-[161px]">
          {/* Grid lines */}
          <img
            className="absolute w-[376px] h-[141px] top-[11px] left-[31px]"
            alt="Horizontal lines"
            src="/horizontal-lines.png"
          />
          <img
            className="absolute w-[376px] h-[141px] top-[11px] left-[31px]"
            alt="Vertical lines"
            src="/vertical-lines.png"
          />

          {/* Y-axis labels */}
          <div className="absolute w-[31px] h-[161px] top-0 left-0">
            {yAxisLabels.map((label, index) => (
              <div
                key={index}
                className="absolute h-[21px] font-normal text-[#333333] text-xs text-right tracking-[0] leading-normal"
                style={{
                  top: `${label.top}px`,
                  left: label.value.length > 2 ? "0" : "7px",
                  width: label.value.length > 2 ? "21px" : "14px",
                }}
              >
                {label.value}
              </div>
            ))}
          </div>

          {/* Line chart area */}
          <img
            className="absolute w-[377px] h-[100px] top-[52px] left-[31px]"
            alt="Line area"
            src="/line---area.png"
          />

          {/* Data points */}
          <div className="absolute w-[381px] h-[92px] top-[49px] left-[29px]">
            {dataPoints.map((point, index) => (
              <div
                key={index}
                className="absolute w-[9px] h-3 bg-white rounded-[4.51px/5.76px] border-2 border-solid border-[#0e9cff]"
                style={{ top: `${point.top}px`, left: `${point.left}px` }}
              />
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="relative w-full h-[21px] mt-0">
          <div className="flex justify-between px-2.5">
            {xAxisLabels.map((day, index) => (
              <div
                key={index}
                className="font-normal text-[#333333] text-xs text-center tracking-[0] leading-normal"
                style={{
                  width:
                    day === "Wednesday"
                      ? "62px"
                      : day === "Thursday"
                        ? "50px"
                        : "auto",
                }}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
