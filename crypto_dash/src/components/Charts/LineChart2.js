import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCoinData } from "../../redux/reducers/coinsSlice";
import * as d3 from "d3";
import { useCallback } from "react";
import { timeFormat } from "d3-time-format";
import { posOrNegColor } from "../../helpers/helpers";

export default function Linechart2(props) {
  const { coin, data, width, height } = props;
  const coins = useSelector(selectCoinData);

  useEffect(() => {
    createCharts();
  });

  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 10, bottom: 50, left: 50 };
  // append the svg object to the body of the page

  const format = d3.timeParse("%d");

  var opts = {
    //   lines: 13, // The number of lines to draw
    //   length: 38, // The length of each line
    //   width: 17, // The line thickness
    //   radius: 45, // The radius of the inner circle
    //   scale: 1, // Scales overall size of the spinner
    //   corners: 1, // Corner roundness (0..1)
    //   speed: 1, // Rounds per second
    //   rotate: 0, // The rotation offset
    //   animation: "spinner-line-fade-quick", // The CSS animation name for the lines
    //   direction: 1, // 1: clockwise, -1: counterclockwise
    //   color: "#116897", // CSS color or array of colors
    //   fadeColor: "transparent", // CSS color or array of colors
    //   shadow: "0 0 1px transparent", // Box-shadow for the lines
    //   zIndex: 2000000000, // The z-index (defaults to 2e9)
    //   className: "spinner", // The CSS class to assign to the spinner
    //   position: "absolute", // Element positioning
  };

  const createCharts = () => {
    var svg = d3
      .select(`.svg-container-${coin}`)
      .append("svg")
      .attr("viewBox", `0 0 ${500} ${800}`)
      //   .attr("width", width + margin.left + margin.right + "%")
      //   .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    let xAxis = d3
      .axisBottom()
      .scale(x)
      .tickFormat(d3.timeFormat("%H:%M:%S"))
      .ticks(100)
      .tickSize(0.1);
    let yAxis = d3.axisLeft().scale(y).ticks(3).tickSize("1px");

    x.domain(
      d3.extent(data, (d) => {
        return d.x;
      })
    );
    y.domain([
      d3.min(data, (d) => {
        return d.y;
      }),
      d3.max(data, (d) => {
        return d.y;
      }),
    ]);
    svg
      .append("g")
      .call(d3.axisBottom(x))
      .call(xAxis)
      .attr("transform", `translate(0,${height})`);

    svg.append("g").call(d3.axisLeft(y)).call(yAxis);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.x);
          })
          .y((d) => {
            return y(d.y);
          })
      );
  };

  return <div className={`svg-container-${coin}`}></div>;
}
