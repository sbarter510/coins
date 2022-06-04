import React, { useEffect, useState } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import lobster from "../../images/lobster.png";

import { Link } from "react-router-dom";

import {
  increment,
  decrement,
  selectCount,
  selectGlobalData,
  fetchData,
} from "../../redux/reducers/headerSlice";
import {
  convertToCurrency,
  formatKeys,
  posOrNegColor,
} from "../../helpers/helpers";

const Header = (props) => {
  return (
    <div className="header-container">
      <div className="header-container__inner">
        <div className="header-links bottom-section">
          <div className="header-data-item">
            <Link to="/">
              <img src={lobster} alt="lobster" width="50" height="50" />
            </Link>
          </div>
          <div className="header-data-item">
            <h5>Coin Lobster</h5>
          </div>
          <div className="header-data-item">
            <Link to="/">
              <h5>Coins</h5>
            </Link>
          </div>
          <div className="header-data-item">
            <h5>Markets</h5>
          </div>
          <div className="header-data-item">
            <h5>NFT's</h5>
          </div>
          <div className="header-data-item">
            <h5>News</h5>
          </div>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search" />
          <span className="material-icons md-36">search</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
