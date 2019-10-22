import React from "react";

const Time = props => {
  return (
    <>
      <h1>
        {props.min}:{props.deci}:{props.centi}
      </h1>
    </>
  );
};

export default Time;
