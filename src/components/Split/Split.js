import React, { useState } from "react";

const Split = props => {
  let [heart, setHeart] = useState(null);

  return (
    <div className="split-container">
      <h2
        onClick={() => {
          setHeart(heart ? (heart = null) : (heart = "<3"));
        }}
      >
        {props.split}
      </h2>
      <p>{heart}</p>
    </div>
  );
};

export default Split;
