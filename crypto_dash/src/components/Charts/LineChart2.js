import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCoinData } from "../../redux/reducers/coinsSlice";
import * as d3 from "d3";
import { useCallback } from "react";
import { timeFormat } from "d3-time-format";
import "./line2.scss";

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
      .attr(
        "viewBox",
        `0 0  ${width - margin.left - margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .attr("preserveAspectRatio", "xMinYMin meet")
      //   .attr("width", width + margin.left + margin.right + "%")
      //   .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(15,${margin.top})`);
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    let xAxis = d3
      .axisBottom()
      .scale(x)
      // .attr("transform", `translate(0,${height})`)
      .tickFormat(d3.timeFormat("%H:%M:%S"))
      .ticks(d3.timeHour.every(3));
    let yAxis = d3.axisLeft().scale(y).ticks(3).tickSize("1px");

    //add chart grid currently only using yaxis
    // const xAxisGrid = d3
    //   .axisBottom(x)
    //   .tickSize(height)
    //   .tickFormat("")
    //   .ticks(10);
    const yAxisGrid = d3.axisLeft(y).tickSize(-width).tickFormat("").ticks(3);

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

    svg.append("g").attr("class", "y-grid").call(yAxisGrid);
    svg
      .append("g")
      .call(d3.axisBottom(x))
      .call(xAxis)
      .attr("transform", `translate(0,${height + 1})`)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("font-size", "3px");
    // .attr("transform", `translate(0, ${height}) rotate(45deg)`);
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .call(yAxis)
      .selectAll("text")
      .attr("dx", "-.8em")
      // .attr("dy", ".15em")
      .attr("font-size", "3px")
      .style("margin-right", "10px");

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
