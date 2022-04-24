import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCoinData } from "../../redux/reducers/coinsSlice";
import * as d3 from "d3";
import { useCallback } from "react";
import { timeFormat } from "d3-time-format";
import "./line2.scss";

export default function Linechart2(props) {
  const { coin, data, width, height, scale } = props;
  const coins = useSelector(selectCoinData);

  useEffect(() => {
    createCharts();
  });

  // set the dimensions and margins of the graph
  var margin = { top: 30, right: 20, bottom: 30, left: 10 };
  // append the svg object to the body of the page

  // const format = d3.timeParse(scale);

  // const formatMillisecond = d3.timeFormat(".%L"),
  //   formatSecond = d3.timeFormat(":%S"),
  //   formatMinute = d3.timeFormat("%I:%M"),
  //   formatHour = d3.timeFormat("%I %p"),
  //   formatDay = d3.timeFormat("%a %d"),
  //   formatWeek = d3.timeFormat("%b %d"),
  //   formatMonth = d3.timeFormat("%B"),
  //   formatYear = d3.timeFormat("%Y");

  // function multiFormat(date) {
  //   return (
  //     d3.timeSecond(date) < date
  //       ? formatMillisecond
  //       : d3.timeMinute(date) < date
  //       ? formatSecond
  //       : d3.timeHour(date) < date
  //       ? formatMinute
  //       : d3.timeDay(date) < date
  //       ? formatHour
  //       : d3.timeMonth(date) < date
  //       ? d3.timeWeek(date) < date
  //         ? formatDay
  //         : formatWeek
  //       : d3.timeYear(date) < date
  //       ? formatMonth
  //       : formatYear
  //   )(date);
  // }

  const createCharts = () => {
    var svg = d3
      .select(`.svg-container-${coin}`)
      .append("svg")
      .attr("overflow", "visible")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr(
        "viewBox",
        `0 0  ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr("width", width - 20)
      // .attr("height", height - 10)
      .append("g");
    var x = d3.scaleTime().range([0, width - margin.left - margin.right]);
    var y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

    let xAxis = d3
      .axisBottom()
      .scale(x)
      .tickFormat(d3.timeFormat("%m-%d-%y"))
      .ticks(8)
      .tickSize(2);
    let yAxis = d3.axisLeft().scale(y).ticks(4).tickSize(0);

    //add chart grid currently only using yaxis
    // const xAxisGrid = d3
    //   .axisBottom(x)
    //   .tickSize(height)
    //   .tickFormat("")
    //   .ticks(10);
    // const yAxisGrid = d3
    //   .axisLeft(y)
    //   .tickSize(-width + margin.left + margin.right)
    //   .tickFormat("")
    //   .ticks(0);

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

    // svg
    //   .append("g")
    //   .attr("class", "y-grid")

    //   .call(yAxisGrid);

    // X-axis Scale
    svg
      .append("g")
      .call(d3.axisBottom(x))
      .call(xAxis)
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .selectAll("text")

      .attr("dx", "-.4em")
      .attr("dy", "1.2em")
      .attr("font-size", "10px");

    // Y Axis Scale
    svg
      .append("g")
      .call(d3.axisLeft(y))
      .call(yAxis)
      .attr("transform", `translate(0,0)`)
      .selectAll("text")
      .attr("dx", "-2")
      .attr("dy", "0")
      .attr("font-size", "12px");

    svg
      .append("path")
      .datum(data)
      .attr("fill", "green")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      // .attr("transform", `translate(-10,0)`)
      .attr(
        "d",
        d3
          .area()
          .x(function (d) {
            return x(d.x);
          })
          .y(function (d) {
            return y(d.y);
          })
        // d3
        //   .line()
        //   .x(function (d) {
        //     return x(d.x);
        //   })
        //   .y((d) => {
        //     return y(d.y);
        //   })
      );
  };

  return <div className={`svg-container-${coin}`}></div>;
}
