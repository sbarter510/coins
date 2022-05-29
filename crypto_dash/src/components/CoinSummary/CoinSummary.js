import React, { useState, useEffect, dangerouslySetInnerHTML } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  fetchDescription,
  selectCoinChartData,
  selectCoinDescription,
} from "../../redux/reducers/coinSummarySlice";
import LineChart2 from "../Charts/LineChart2";
import * as d3 from "d3";
import TextButton from "../common/TextButton/TextButton";
import "./coinSummary.scss";
import Thermometer from "../Charts/Thermometer";
import CoinStats from "./CoinStats";
import CoinSummaryHeader from "./CoinSummaryHeader";

export default function CoinSummary() {
  const param = useParams();
  const dispatch = useDispatch();
  const chartData = useSelector(selectCoinChartData);
  const coinDescription = useSelector(selectCoinDescription);
  const [days, setDays] = useState("1");
  const [thermometerData, setThermometerData] = useState("");
  const [currentCoin, setCurrentCoin] = useState(param.coin);

  // fetch chart data based on the coin provided in url param react router dom
  useEffect(() => {
    dispatch(fetchData({ coin: param.coin, days: days }));
    dispatch(fetchDescription({ coin: param.coin }));
  }, [days]);

  useEffect(() => {
    if (chartData && chartData.length > 0 && days === "1") {
      setThermometerData(chartData);
    }
  });

  useEffect(() => {
    return () => {
      d3.select("svg").remove();
    };
  });

  const onDayClickHandler = () => {
    return setDays(1);
  };

  const onWeekClickHandler = () => {
    return setDays(7);
  };

  const onMonthClickHandler = () => {
    return setDays(30);
  };

  const onYearClickHandler = () => {
    return setDays(365);
  };

  const onMaxClickHandler = () => {
    return setDays("max");
  };

  const showDescription = () => {
    if (coinDescription) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: coinDescription.description.en,
          }}
        />
      );
    }
  };

  return (
    <div className="coin-summary-container">
      <CoinSummaryHeader
        coinName={param.coin.toUpperCase()}
        onDayClickHandler={onDayClickHandler}
        onWeekClickHandler={onWeekClickHandler}
        onMonthClickHandler={onMonthClickHandler}
        onYearClickHandler={onYearClickHandler}
        onMaxClickHandler={onMaxClickHandler}
      />
      <div className="coin-summary-stats-header">
        <Thermometer data={thermometerData} />
      </div>
      <div className="chart-container">
        <LineChart2
          coin={param.coin}
          height={350}
          width={800}
          scale={"%Y-%m-%d"}
          data={chartData}
        />
      </div>
      <CoinStats />
      <div
        className="coin-description"
        style={{ maxHeight: "200px", textOverflow: "ellipsis" }}
      >
        {showDescription()}
      </div>
    </div>
  );
}
