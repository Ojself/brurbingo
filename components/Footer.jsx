"use client";

import { useState } from "react";
import React from "react";

const Footer = () => {
  const [horsePositionX, setHorsePositionX] = useState(5);
  const handleClick = () => {
    setInterval(() => {
      let random = Math.random() * 5 + 3;
      setHorsePositionX((prevPosition) => prevPosition - random);
    }, 80);
  };
  const rotation = horsePositionX % 15;
  const horsePositionY = horsePositionX < -8 && horsePositionX > -160 ? -17 : 0;

  return (
    <footer className='relative h-24 border-t-2 w-screen bg-yellow-100 flex items-center justify-center'>
      <p>
        Powered by{" "}
        <a
          className='hover:underline'
          rel='noopener noreferrer'
          href='https://github.com/Ojself/'
        >
          Tormod
        </a>{" "}
        <span
          onClick={handleClick}
          className='cursor-pointer ml-1'
          style={{
            position: "absolute",
            transform: `translateX(${horsePositionX}px) translateY(${horsePositionY}px) rotate(${rotation}deg)`,
          }}
        >
          🐎
        </span>
      </p>
    </footer>
  );
};

export default Footer;
