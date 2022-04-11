import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  selectCoinChartData,
} from "../../redux/reducers/coinSummarySlice";
import LineChart2 from "../Charts/LineChart2";
import * as d3 from "d3";
import TextButton from "../common/TextButton/TextButton";
import "./coinSummary.scss";

export default function CoinSummary() {
  const param = useParams();
  const dispatch = useDispatch();
  const chartData = useSelector(selectCoinChartData);
  const [days, setDays] = useState(1);

  // fetch chart data based on the coin provided in url param react router dom
  useEffect(() => {
    dispatch(fetchData(param.coin, days));
  }, [days]);

  //cleans svg upon rerenders
  useEffect(() => {
    d3.selectAll("svg").remove();
  }, []);

  useEffect(() => {
    d3.selectAll("svg").remove();
  }, [days]);

  const onWeekClickHandler = () => {
    return setDays(7);
  };

  return (
    <div style={{}}>
      <div className="coin-summary-header">
        <h1 className="header">{param.coin.toUpperCase()} Chart Data</h1>
        <TextButton value="1 day" />
        <TextButton value="7 day" onClickHandler={onWeekClickHandler} />
        <TextButton value="30 day" />
      </div>
      <LineChart2 coin={param.coin} height={100} width={500} data={chartData} />
    </div>
  );
}
