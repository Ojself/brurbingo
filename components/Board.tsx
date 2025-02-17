import React, { useState } from "react";
import { Word } from "@/lib/types";
import { useLongPress } from "use-long-press";
import ReactCardFlip from "react-card-flip";
import data from "../lib/data.json";
import Image from "next/image";

type BoardProps = {
  matrix: Word[][];
  onClick: (word: Word) => void;
  selectedWords: Word[];
  gameOver: boolean;
};

const Board = ({ matrix, onClick, selectedWords, gameOver }: BoardProps) => {
  const [cardFlipped, setCardFlipped] = useState<Word>("");
  const [blink, setBlink] = useState(false);
  const bind = useLongPress(
    (event: any) => {
      const word = event.target.textContent.replace("-", "");
      if (word === "FREE") {
        return setCardFlipped("");
      }
      if (cardFlipped === word) {
        return setCardFlipped("");
      }
      setCardFlipped(word);
    },
    {
      filterEvents: (event) => {
        return true;
      },
    }
  );

  const handleClick = (word: Word, e: any) => {
    e.preventDefault();
    if (word === "FREE") {
      return;
    }
    setCardFlipped("");
    onClick(word);
  };

  const breakWord = (word: Word) => {
    if (word.includes(" ")) {
      return word;
    }
    const middleIndex = Math.floor(word.length / 2);
    const firstHalf = word.slice(0, middleIndex);
    const secondHalf = word.slice(middleIndex);
    if (word.length > 8) {
      return (
        <>
          {firstHalf + "-"}
          <br />
          {secondHalf}
        </>
      );
    }
    return word;
  };

  const blinkStyle = blink ? "animate-pulse" : "";
  return (
    <table className="table-fixed ">
      <tbody className={blinkStyle}>
        {matrix.map((row, i) => (
          <tr key={i}>
            {row.map((word, j) => {
              const wordIsSelected = selectedWords.includes(word);
              const background = wordIsSelected ? "bg-green-200 " : "";
              const fontWeight =
                gameOver && wordIsSelected ? "font-bold" : "font-light";
              const isFreeWord = word === "FREE";
              const author = data.find((d) => d.word === word)?.submittedBy;

              return (
                <td
                  className="cursor-pointer select-none text-center"
                  key={word}
                >
                  {!isFreeWord ? (
                    <ReactCardFlip
                      key={word}
                      isFlipped={cardFlipped === word}
                      flipDirection="horizontal"
                    >
                      <div
                        {...bind()}
                        onClick={(e) => handleClick(word, e)}
                        className={`flex items-center justify-center px-1 w-[70px] h-[70px] md:w-28 md:h-28 border border-gray-400  ${background}`}
                      >
                        <p className={`text-xs md:text-sm ${fontWeight}`}>
                          {breakWord(word)}
                        </p>
                      </div>

                      <div
                        {...bind()}
                        onClick={() => setCardFlipped("")}
                        className={`flex flex-col items-center justify-center  w-[70px] h-[70px] md:w-28 md:h-28 border border-blue-500 `}
                      >
                        <p className="text-xs">Submitted by</p>
                        <p>{breakWord(author || " ")}</p>
                      </div>
                    </ReactCardFlip>
                  ) : (
                    <div
                      {...bind()}
                      onClick={(e) => handleClick(word, e)}
                      className={`flex items-center justify-center w-[70px] h-[70px] md:w-28 md:h-28 border border-gray-400  ${background}`}
                    >
                      <Image
                        alt="Solstråla"
                        src="/imgs/brur_face.gif"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
