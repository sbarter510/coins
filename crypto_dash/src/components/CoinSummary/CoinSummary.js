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

  useEffect(() => {
    d3.selectAll("svg").remove();
  }, []);

  return (
    <div>
      <h1>{param.coin.toUpperCase()} Chart Data</h1>
      <div>
        <LineChart2
          coin={param.coin}
          height={300}
          width={1000}
          data={chartData}
        />
      </div>
    </div>
  );
}
