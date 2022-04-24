import React, { useState, useEffect } from "react";
import "./thermometer.scss";
import { convertToCurrency } from "../../helpers/helpers";
import * as d3 from "d3";

export default function Thermometer(props) {
  const { data } = props;

  const [low, setLow] = useState("");
  const [high, setHigh] = useState("");
  const [range, setRange] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      setLow(d3.min(data, (d) => d.y));
      setHigh(d3.max(data, (d) => d.y));
      setRange(d3.extent(data, (d) => data.y));
    }
  }, [data]);

  const computeWidth = () => {
    let lesserValues = data.filter((d) => d.y < low);
    // setWidth({ width: (lesserValues.length / data.length) * 100 });
  };

  useEffect(() => {
    if (data) {
      computeWidth();
    }
  });

  return (
    <div className="thermometer">
      <div
        className="thermometer-inner"
        style={{ width: width.width + "%" }}
      ></div>
      <div className="thermometer-footer">
        <p>{convertToCurrency(low, "usd")}</p>
        <p>24H Range</p>
        <p>{convertToCurrency(high, "usd")}</p>
      </div>
    </div>
  );
}
