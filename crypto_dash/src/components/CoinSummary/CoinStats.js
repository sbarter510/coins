import React from "react";
import { selectCoinDescription } from "../../redux/reducers/coinSummarySlice";
import { useSelector, useDispatch } from "react-redux";
import { convertToCurrency } from "../../helpers/helpers";
import "./coinstats.scss";

export default function CoinStats() {
  const coinDescription = useSelector(selectCoinDescription);

  if (coinDescription) {
    return (
      <div className="card coin-stats">
        <div className="card-header">Price Statistics</div>
        <div className="card-body">
          <span style={{ display: "inline" }}>
            Current Price:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {coinDescription.market_data &&
                convertToCurrency(
                  coinDescription.market_data.current_price.usd,
                  "usd"
                )}
            </p>
          </span>
          <hr></hr>
          <span style={{ display: "inline" }}>
            ROI:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {coinDescription.market_data.roi
                ? Math.round(
                    Number(coinDescription.market_data.roi.percentage),
                    2
                  ) + " %"
                : "N/A"}{" "}
            </p>
          </span>
          <hr></hr>
          <span style={{ display: "inline" }}>
            Market Cap:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {coinDescription.market_data &&
                convertToCurrency(
                  coinDescription.market_data.market_cap.usd,
                  "usd"
                )}{" "}
            </p>
          </span>
          <hr></hr>

          <span style={{ display: "inline" }}>
            Total Volume:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {coinDescription.market_data &&
                convertToCurrency(
                  coinDescription.market_data.total_volume.usd,
                  "usd"
                )}{" "}
            </p>
          </span>
          <hr></hr>

          <span style={{ display: "inline" }}>
            Volume / Market Cap:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {coinDescription.market_data &&
                Math.round(
                  Number(coinDescription.market_data.total_volume.usd) /
                    Number(coinDescription.market_data.market_cap.usd),
                  2
                )}{" "}
            </p>
          </span>
          <hr></hr>

          <span style={{ display: "inline" }}>
            24H Low / 24H High:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {coinDescription.market_data &&
                convertToCurrency(
                  coinDescription.market_data.high_24h.usd,
                  "usd"
                )}{" "}
              /{" "}
              {convertToCurrency(
                coinDescription.market_data.low_24h.usd,
                "usd"
              )}
            </p>
          </span>
          <hr></hr>

          <span style={{ display: "inline" }}>
            Market Cap Rank:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {"# "} {coinDescription.market_data.market_cap_rank}
            </p>
          </span>
          <hr></hr>

          <span style={{ display: "inline" }}>
            All Time High:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {coinDescription.market_data &&
                convertToCurrency(
                  coinDescription.market_data.ath.usd,
                  "usd"
                )}{" "}
            </p>
          </span>
          <hr></hr>

          <span style={{ display: "inline" }}>
            All Time Low:{" "}
            <p
              style={{
                display: "inline",
                marginLeft: "10px",
              }}
            >
              {coinDescription.market_data &&
                convertToCurrency(
                  coinDescription.market_data.atl.usd,
                  "usd"
                )}{" "}
            </p>
          </span>
          <hr></hr>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
