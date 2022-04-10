import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  selectCoinChartData,
} from "../../redux/reducers/coinSummarySlice";
import LineChart2 from "../Charts/LineChart2";
import * as d3 from "d3";

export default function CoinSummary() {
  const param = useParams();
  const dispatch = useDispatch();
  const chartData = useSelector(selectCoinChartData);

  // fetch chart data based on the coin provided in url param react router dom
  useEffect(() => {
    dispatch(fetchData(param.coin));
  }, []);

  //cleans svg upon rerenders
  useEffect(() => {
    d3.selectAll("svg").remove();
  }, []);

  return (
    <div style={{ width: "100%", maxHeight: "300px" }}>
      <h1>{param.coin.toUpperCase()} Chart Data</h1>

      <LineChart2 coin={param.coin} height={100} width={300} data={chartData} />
    </div>
  );
}
