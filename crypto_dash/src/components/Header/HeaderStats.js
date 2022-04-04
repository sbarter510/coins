import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

export default function HeaderStats() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const globalData = useSelector(selectGlobalData);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const showHeaderData = () => {
    let defaultCurrency = "btc";
    return Object.entries(globalData).map((k) => {
      if (k[0] === "updated_at") {
        let updateTimeHours = new Date(k[1] * 1000).toLocaleTimeString();
        return (
          <div className="header-data-item" key={k[0]}>
            <p>
              {formatKeys(k[0])}: {updateTimeHours}
            </p>
          </div>
        );
      } else if (k[0] === "market_cap_change_percentage_24h_usd") {
        return (
          <div className="header-data-item" key={k[0]}>
            <span>
              {formatKeys(k[0])}:{" "}
              <p style={posOrNegColor(k[1])}>{k[1].toFixed(2)}%</p>
              <span
                className="material-icons md-36"
                id="arrow-icon"
                style={posOrNegColor(k[1])}
              >
                arrow_upward
              </span>
            </span>
          </div>
        );
      } else if (!(typeof k[1] === "object")) {
        return (
          <div className="header-data-item" key={k[0]}>
            <p>
              {formatKeys(k[0])}: {k[1]}
            </p>
          </div>
        );
      } else {
        return (
          <div className="header-data-item" key={k[0]}>
            <p>
              {formatKeys(k[0])} : {k[1][defaultCurrency].toFixed(2)}
            </p>
          </div>
        );
      }
    });
  };
  return (
    <div className="header__header-stats">{globalData && showHeaderData()}</div>
  );
}
