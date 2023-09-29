/** @jsxImportSource @emotion/react */

import { keyframes } from "@emotion/react";

const bounce = keyframes({
  "0%": {
    transform: "scale(0)",
  },
  "50%": {
    transform: "scale(1)",
  },
  "100%": {
    transform: "scale(0)",
  },
});

const ThreeDotLoader = () => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ".4rem",
      }}
    >
      <div
        css={{
          backgroundColor: "grey",
          display: "flex",
          justifyContent: "space-between",
          width: "1rem",
          height: "1rem",
          borderRadius: "50%",
          //   animationi with a delay
          animation: `${bounce} 1s ease infinite`,
        }}
      ></div>
      <div
        css={{
          backgroundColor: "grey",
          display: "flex",
          justifyContent: "space-between",
          width: "1rem",
          height: "1rem",
          borderRadius: "50%",
          animation: `${bounce} 1s ease infinite`,
          animationDelay: ".2s",
        }}
      ></div>
      <div
        css={{
          backgroundColor: "grey",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          width: "1rem",
          height: "1rem",
          borderRadius: "50%",
          animation: `${bounce} 1s ease infinite`,
          animationDelay: ".4s",
        }}
      ></div>
    </div>
  );
};

export default ThreeDotLoader;
