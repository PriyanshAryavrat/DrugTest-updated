import React from "react";
import "./index.css";

const InputData = (props) => {
  return (
    <React.Fragment>
      <input
        name={props.name}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        value={props.value}
        // required="true"
        // validators={["required"]}
        // errorMessages={["This field is required"]}
      />
    </React.Fragment>
  );
};
export default InputData;
