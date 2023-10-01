"use client";
import { useState } from "react";
import React from "react";

const Footer = () => {
  const [horsePosition, setHorsePosition] = useState(5);
  const handleClick = () => {
    const newIntervalId = setInterval(() => {
      let random = Math.random() * 5 + 3;
      setHorsePosition((prevPosition) => prevPosition - random);
    }, 80);
  };
  const rotation = horsePosition % 15;

  return (
    <footer className='relative h-24 border-t-2 w-screen bg-yellow-100 flex items-center justify-center'>
      <p>
        Powered by{" "}
        <span
          onClick={handleClick}
          style={{
            cursor: "pointer",
            position: "absolute",
            transform: `translateX(${horsePosition}px) rotate(${rotation}deg)`,
          }}
        >
          🐎
        </span>
      </p>
    </footer>
  );
};

export default Footer;
