import React from "react";
import StateData from "../../Config/CountryStates.json";
import TextValidator from "../../Form/TextValidator/Index"

const StateDropDown = (props) => {
  return (
    <React.Fragment>
      <select onChange={(e)=> {
          var index = e.nativeEvent.target.selectedIndex;
          props.onChange(e.nativeEvent.target[index].text)
      }}>
        {StateData.map((item) => {
          return <option>{item.name}</option>;
        })}
      </select>
    </React.Fragment>
  );
};

export default StateDropDown;
