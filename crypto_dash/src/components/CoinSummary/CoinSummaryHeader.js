import React from "react";
import TextButton from "../common/TextButton/TextButton";

export default function CoinSummaryHeader(props) {
  const {
    coinName,
    onDayClickHandler,
    onWeekClickHandler,
    onMonthClickHandler,
    onYearClickHandler,
    onMaxClickHandler,
  } = props;

  return (
    <div className="coin-summary-header">
      <div className="row">
        <h1 className="header">{coinName}</h1>
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
  );
}
