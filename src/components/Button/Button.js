import React from "react";

const Button = props => {
  return (
    <>
      <button onClick={props.click}>
        <h4>{props.text}</h4>
      </button>
    </>
  );
};

export default Button;
