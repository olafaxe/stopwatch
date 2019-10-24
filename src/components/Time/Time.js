import React from "react";

const Time = props => {
  return (
    <>
      <h1>
        {props.mm}:{props.ss}:{props.cs}
      </h1>
    </>
  );
};

export default Time;
