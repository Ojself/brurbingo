import React, { useState } from "react";
import { Word } from "@/lib/types";
import { useLongPress } from "use-long-press";
import ReactCardFlip from "react-card-flip";
import data from "../lib/data.json";

type BoardProps = {
  matrix: Word[][];
  onClick: (word: Word) => void;
  selectedWords: Word[];
  gameOver: boolean;
};

const Board = ({ matrix, onClick, selectedWords, gameOver }: BoardProps) => {
  const [cardFlipped, setCardFlipped] = useState<Word>("");
  const bind = useLongPress((event: any) => {
    const word = event.target.textContent;
    if (word === "FREE") {
      return setCardFlipped("");
    }
    if (cardFlipped === word) {
      return setCardFlipped("");
    }
    setCardFlipped(word);
  });

  const handleClick = (word: Word) => {
    if (word === "FREE") {
      return;
    }
    setCardFlipped("");
    onClick(word);
  };

  return (
    <table className='table-fixed'>
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>
            {row.map((word, j) => {
              const wordIsSelected = selectedWords.includes(word);
              const background = wordIsSelected ? "bg-green-200 " : "";
              const fontWeight = gameOver && wordIsSelected ? "font-black" : "";
              const isFreeWord = word === "FREE";
              const author = data.find((d) => d.word === word)?.submittedBy;

              return (
                <td
                  className='cursor-pointer select-none text-center'
                  key={word}
                >
                  {!isFreeWord ? (
                    <ReactCardFlip
                      key={word}
                      isFlipped={cardFlipped === word}
                      flipDirection='horizontal'
                    >
                      <div
                        {...bind()}
                        onClick={() => handleClick(word)}
                        className={`flex items-center justify-center w-24 h-24 border border-gray-400  ${background} ${fontWeight}`}
                      >
                        <p className=''>{word}</p>
                      </div>

                      <div
                        {...bind()}
                        onClick={() => setCardFlipped("")}
                        className={`flex flex-col items-center justify-center w-24 h-24 border border-red-400 text-xs `}
                      >
                        <p>Submitted by</p>
                        <p>{author}</p>
                      </div>
                    </ReactCardFlip>
                  ) : (
                    <div
                      {...bind()}
                      onClick={() => handleClick(word)}
                      className={`flex items-center justify-center w-24 h-24 border border-gray-400  ${background} ${fontWeight}`}
                      id={"brur-face"}
                    >
                      <p className=''>{""}</p>
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
