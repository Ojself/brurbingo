import React from "react";
import Snowfall from "react-snowfall";

const ConfettiFall = () => {
  const brurFace = document.createElement("img");
  brurFace.src = "/imgs/brur_confetti.png";

  return (
    <Snowfall
      speed={[0.05, 0.1]}
      wind={[0.005, 0.1]}
      rotationSpeed={[0.01, 0.02]}
      snowflakeCount={50}
      images={[brurFace]}
      radius={[10,30]}
    />
  );
};

export default ConfettiFall;
