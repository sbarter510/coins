import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCoinData } from "../../redux/reducers/coinsSlice";
import * as d3 from "d3";
import { useCallback } from "react";
import { timeFormat } from "d3-time-format";
import { posOrNegColor } from "../../helpers/helpers";

export default function Linechart() {
  const coins = useSelector(selectCoinData);

  useEffect(() => {
    createCharts();
  });

  // set the dimensions and margins of the graph
  var margin = { top: 5, right: 5, bottom: 5, left: 5 };
  let width = 150;
  let height = 45;
  // append the svg object to the body of the page

  const format = d3.timeParse("%Y-%m-%d");

  var opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: "spinner-line-fade-quick", // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: "#116897", // CSS color or array of colors
    fadeColor: "transparent", // CSS color or array of colors

    shadow: "0 0 1px transparent", // Box-shadow for the lines
    zIndex: 2000000000, // The z-index (defaults to 2e9)
    className: "spinner", // The CSS class to assign to the spinner
    position: "absolute", // Element positioning
  };
  const createCharts = () => {
    coins.forEach(async (coin) => {
      var svg = d3
        .select(`.svg-container-${coin.symbol}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g");
      // .attr("transform", "translate(" + margin.left + "," - margin.top + ")");

      await fetch(`http://localhost:5000/fetchRange?coin_name=${coin.id}`)
        .then((res) => res.json())
        .then((data) => {
          let parseTime = d3.timeFormat("%Y-%m-%d-%H-%M-%S");

          const myData = data.data.prices;
          const formattedData = [];
          myData.forEach((arr) => {
            arr[0] = new Date(arr[0] * 1000);
            console.log(typeof arr[0]);
            arr[1] = +arr[1];
            formattedData.push({ date: arr[0], value: arr[1] });
          });
          console.log(formattedData);
          var x = d3.scaleTime().range([0, width]);
          var y = d3.scaleLinear().range([height, 0]);
          x.domain(
            d3.extent(formattedData, (d) => {
              return d.date;
            })
          );
          y.domain([
            d3.min(formattedData, (d) => {
              return d.value;
            }),
            d3.max(formattedData, (d) => {
              return d.value;
            }),
          ]);
          // svg
          //   .append("g")
          //   .attr("transform", `translate(-30, ${300})`)
          //   .call(d3.axisBottom(x));
          // svg.append("g").call(d3.axisLeft(y));

          svg
            .append("path")
            .datum(formattedData)
            .attr("fill", "none")
            .attr(
              "stroke",
              posOrNegColor(
                coin.market_data.price_change_percentage_7d_in_currency["usd"]
              ).color
            )
            .attr("stroke-width", 1.5)
            .attr(
              "d",
              d3
                .line()
                .x(function (d) {
                  return x(d.date);
                })
                .y((d) => {
                  return y(d.value);
                })
            );
        });
    });
  };

  return <div className="svg-container"></div>;
}
