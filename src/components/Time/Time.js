import React from "react";

const Time = props => {
  return (
    <>
      <h1>
        {props.mm}:{props.ss}:{props.ms}
      </h1>
    </>
  );
};

export default Time;
