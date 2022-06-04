import React, { useState, useEffect, useLayoutEffect } from "react";
import "./coins.scss";
import { useSelector } from "react-redux";
import {
  fetchChartData,
  selectCoinData,
} from "../../redux/reducers/coinsSlice";
import { useDispatch } from "react-redux";
import { fetchCoinData, loading } from "../../redux/reducers/coinsSlice";
import CoinsHeader from "./CoinsHeader";
import * as d3 from "d3";
import PageNav from "./PageNav";
import Linechart from "../Charts/Linechart";
import { upOrDownArrow, posOrNegColor } from "../../helpers/helpers";
import { Link } from "react-router-dom";

export default function Coins() {
  const coins = useSelector(selectCoinData);
  const [page, setPage] = useState(1);
  // const chartData = useSelector((state) => state.coins.chartData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinData(page));
  }, [page]);

  useEffect(() => {
    d3.selectAll("svg").remove();
  }, [page]);

  const onPageChangeHandler = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  const onHover = (e) => {
    // e.currentTarget.style.backgroundColor = "rgb(0,0,0,0.1)";
  };

  const onMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "";
  };

  const createCoinsTable = () => {
    if (coins) {
      return coins.map((coin, idx) => {
        return (
          <Link
            to={`summary/${coin.name.toLowerCase()}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
            key={coin.name}
          >
            <div
              className="coins-table__row"
              onMouseEnter={(e) => onHover(e)}
              onMouseLeave={(e) => onMouseLeave(e)}
              key={idx}
            >
              <div className="coins-table__cell">
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  # {" " + " "}
                  {coin.market_data.market_cap_rank}
                </p>
              </div>
              <div className="coins-table__cell">
                <div className="coin-name-container">
                  <div>
                    <img src={coin.image.small}></img>
                  </div>
                  <div>
                    <p>{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
              </div>
              <div className="coins-table__cell">
                <p>
                  $
                  {coin.market_data.current_price["usd"].toLocaleString(
                    "en-US",
                    {
                      type: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 8,
                    }
                  )}
                </p>
              </div>
              <div className="coins-table__cell">
                <p
                  style={posOrNegColor(
                    coin.market_data.price_change_percentage_1h_in_currency[
                      "usd"
                    ]
                  )}
                >
                  {coin.market_data.price_change_percentage_1h_in_currency[
                    "usd"
                  ].toFixed(1)}
                  %
                </p>
              </div>
              <div className="coins-table__cell">
                <p
                  style={posOrNegColor(
                    coin.market_data.price_change_percentage_24h_in_currency[
                      "usd"
                    ]
                  )}
                >
                  {coin.market_data.price_change_percentage_24h_in_currency[
                    "usd"
                  ].toFixed(1)}
                  %
                </p>
              </div>
              <div className="coins-table__cell">
                <p
                  style={posOrNegColor(
                    coin.market_data.price_change_percentage_7d_in_currency[
                      "usd"
                    ]
                  )}
                >
                  {coin.market_data.price_change_percentage_7d_in_currency[
                    "usd"
                  ].toFixed(1)}
                  %
                </p>
              </div>
              <div className="coins-table__cell">
                <p>
                  $
                  {coin.market_data.total_volume["usd"].toLocaleString(
                    "en-US",
                    {
                      type: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 8,
                    }
                  )}
                </p>
              </div>
              <div className="coins-table__cell">
                <p>
                  $
                  {coin.market_data.market_cap["usd"].toLocaleString("en-US", {
                    type: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 8,
                  })}
                </p>
              </div>
              <div className="coins-table__cell">
                <div className={`coins-table__cell__chart-${coin.symbol}`}>
                  <div className={`svg-container-${coin.symbol}`}></div>
                </div>
              </div>
            </div>
          </Link>
        );
      });
    }
  };

  return (
    <div className="coins-container">
      <div className="coins-header">
        <h5 className="header">Cryptocurrency Prices by Market Cap</h5>
      </div>
      <div className="coins-table">
        <CoinsHeader />
        {createCoinsTable()}
        <PageNav page={page} onPageChangeHandler={onPageChangeHandler} />
        <Linechart />
      </div>
    </div>
  );
}
