import React from "react";

export default function CoinsHeader() {
  return (
    <div className="coins-table__header__row">
      <div className="coins-table__header">
        <p>Rank</p>
      </div>
      <div className="coins-table__header">
        <p>Coin</p>
      </div>
      <div className="coins-table__header">
        <p>Price</p>
      </div>
      <div className="coins-table__header">
        <p>1h</p>
      </div>
      <div className="coins-table__header">
        <p>24h</p>
      </div>
      <div className="coins-table__header">
        <p>7d</p>
      </div>
      <div className="coins-table__header">
        <p>24h Volume</p>
      </div>
      <div className="coins-table__header">
        <p>Market Cap</p>
      </div>
      <div className="coins-table__header">
        <p>Last 7 Days</p>
      </div>
    </div>
  );
}
