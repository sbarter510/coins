import React from "react";
import "./textButton.scss";

export default function TextButton(props) {
  return (
    <div className="text-button" onClick={props.onClickHandler}>
      {props.value}
    </div>
  );
}
