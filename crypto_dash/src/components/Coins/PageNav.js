import React from "react";

export default function PageNav(props) {
  // TODO: add backwards navigation
  return (
    <div className="coins-table__page-nav">
      <i className="material-icons">arrow_back</i>
      <p style={{ fontSize: "larger", margin: "15px" }}>{props.page}</p>
      <i className="material-icons" onClick={() => props.onPageChangeHandler()}>
        arrow_forward
      </i>
    </div>
  );
}
