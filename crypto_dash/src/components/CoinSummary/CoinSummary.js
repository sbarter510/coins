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

  return (
    <div style={{}}>
      <div className="coin-summary-header">
        <div className="row">
          <h1 className="header">{param.coin.toUpperCase()} Chart Data</h1>
          <div className="row chart-buttons">
            <div className="col">
              <TextButton value="1d" onClickHandler={onDayClickHandler} />
            </div>
            <div className="col">
              <TextButton value="7d" onClickHandler={onWeekClickHandler} />
            </div>
            <div className="col">
              <TextButton value="30d" onClickHandler={onMonthClickHandler} />
            </div>
            <div className="col">
              <TextButton value="Year" onClickHandler={onYearClickHandler} />
            </div>
            <div className="col">
              <TextButton value="Max" onClickHandler={onMaxClickHandler} />
            </div>
          </div>
        </div>
      </div>

      <Thermometer data={thermometerData} />

      <div
        className="chart-container"
        style={{
          height: "100%",
          width: "60%",
          padding: "25px",
        }}
      >
        <LineChart2
          coin={param.coin}
          height={350}
          width={800}
          scale={"%Y-%m-%d"}
          data={chartData}
        />
      </div>
      <div className="coin-description">
        <div dangerouslySetInnerHTML={{ __html: coinDescription }} />
      </div>
    </div>
  );
}
