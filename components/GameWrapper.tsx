"use client";
import { Word } from "@/lib/types";
import React, { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

import Board from "./Board";
import data from "../lib/data.json";
import ConfettiFall from "./ConfettiFall";
import Footer from "./Footer";

const GameWrapper = () => {
  const [wordsMatrix, setWordsMatrix] = useState<Word[][]>([]);
  const [selectedWords, setSelectedWords] = useState<Word[]>(["FREE"]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [animateHeader, setAnimateHeader] = useState<boolean>(false);
  const [flippedBoard, setFlippedBoard] = useState<boolean>(false);

  useEffect(() => {
    const previousMatrix = localStorage.getItem(`brurbingo-matrix`);
    const selectedWords = localStorage.getItem(`brurbingo-selectedWords`);
    if (previousMatrix && selectedWords) {
      setWordsMatrix(JSON.parse(previousMatrix));
      setSelectedWords(JSON.parse(selectedWords));
      setLoading(false);
    } else {
      resetBoard();
    }
  }, []);

  const getRandomWordFromArray = (array: Word[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const resetBoard = () => {
    setLoading(true);
    const uniqueWords = new Set<Word>();
    while (true) {
      const word = getRandomWordFromArray(data.map((d) => d.word));
      if (uniqueWords.size === 12) {
        uniqueWords.add("FREE");
      }
      uniqueWords.add(word);
      if (uniqueWords.size === 25) {
        break;
      }
    }
    const newMatrix = Array.from(uniqueWords).reduce((acc, word, i) => {
      const row = Math.floor(i / 5);
      const col = i % 5;
      if (!acc[row]) {
        acc[row] = [];
      }
      acc[row][col] = word;
      return acc;
    }, [] as Word[][]);
    localStorage.setItem(`brurbingo-matrix`, JSON.stringify(newMatrix));
    localStorage.setItem(`brurbingo-selectedWords`, JSON.stringify(["FREE"]));
    setSelectedWords(["FREE"]);
    setWordsMatrix(newMatrix);
    setGameOver(false);
    setLoading(false);
  };

  useEffect(() => {
    if (checkVictoryRow() || CheckVictoryColumn() || checkVictoryDiagonal()) {
      setGameOver(true);
      setAnimateHeader(true);
      setTimeout(() => {
        setAnimateHeader(false);
      }, 1000);
    } else {
      setGameOver(false);
    }
  }, [selectedWords]);

  const onClick = (word: Word) => {
    if (gameOver && !selectedWords.includes(word)) {
      return;
    }
    let newSelectedWords;
    if (!selectedWords.includes(word)) {
      newSelectedWords = [...selectedWords, word];
    } else {
      newSelectedWords = selectedWords.filter((w) => w !== word);
    }
    setSelectedWords(newSelectedWords);
    localStorage.setItem(
      `brurbingo-selectedWords`,
      JSON.stringify(newSelectedWords)
    );
  };
  const checkVictoryRow = () => {
    const isBingo = wordsMatrix.some((row) => {
      if (!row) {
        return false;
      }
      return row.every((word) => selectedWords.includes(word));
    });
    return isBingo;
  };
  const CheckVictoryColumn = () => {
    let isBingo = false;

    wordsMatrix.forEach((row, i) => {
      if (!row) {
        return false;
      }
      let correctWords = 0;
      row.forEach((_, j) => {
        if (selectedWords.includes(wordsMatrix[j][i])) {
          correctWords++;
        }
        if (correctWords === 5) {
          isBingo = true;
        }
      });
      return isBingo;
    });

    return isBingo;
  };
  const checkVictoryDiagonal = () => {
    // should check both diagonals
    const leftRightDiagonal = wordsMatrix.map((row, i) => row[i]);
    const rightLeftDiagonal = wordsMatrix.map(
      (row, i) => row[row.length - 1 - i]
    );
    if (!leftRightDiagonal.length || !rightLeftDiagonal.length) {
      return false;
    }
    const isBingo =
      leftRightDiagonal.every((word) => selectedWords.includes(word)) ||
      rightLeftDiagonal.every((word) => selectedWords.includes(word));
    return isBingo;
  };

  const animationStyle = animateHeader ? "animate-ping" : "";

  return (
    <div className='flex flex-col justify-between items-center h-full'>
      {gameOver && <ConfettiFall />}
      <div className='flex flex-col items-center justify-center h-full'>
        <h1
          className={`text-4xl mb-4 font-medium uppercase text-center ${animationStyle}`}
        >
          Brur Bingo
        </h1>

        {loading ? (
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
        ) : (
          <Board
            matrix={wordsMatrix}
            selectedWords={selectedWords}
            onClick={onClick}
            gameOver={gameOver}
          />
        )}
        <div className='flex flex-col items-center justify-center'>
          <p className='text-xs italic'>Tip: Long press to see who submitted</p>
          
            <button
              className='border py-2 px-4 mt-2 bg-blue-500 text-white rounded-md'
              onClick={resetBoard}
            >
              Reset
            </button>
          
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default GameWrapper;
