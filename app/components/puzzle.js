import React, { useState } from "react";
import { settings } from "../utils/settings";
import { Square } from "./square";
import { Clues } from "./clues";
import { Header } from "./header";

export const Puzzle = () => {
  const squareSettings = {
    size: 34,
    numberPosXOffSet: 1,
    numberPosYOffSet: 7,
    letterPosXOffSet: 10,
    letterPosYOffSet: 24,
  };

  const [cells, setCells] = useState(settings.cells);
  const [selectedCell, setSelectedCell] = useState(null);
  const [acrossClues] = useState(
    settings.clues.filter((clue) => clue.direction === 0)
  );

  const [downClues] = useState(
    settings.clues.filter((clue) => clue.direction === 1)
  );

  const [directionSelection] = useState("across");
  const [selectedWord, setSelectedWord] = useState(null);

  const clearSelection = (key) => {
    setCells((prevCells) =>
      prevCells.map((cell) => {
        cell[key] = false;
        return cell;
      })
    );
  };

  const selectSquare = (x, y) => {
    clearSelection("selectedCell");
    setCells((prevCells) =>
      prevCells.map((cell) => {
        return cell.x === x && cell.y === y
          ? { ...cell, selectedCell: true }
          : cell;
      })
    );

    setSelectedCell({ x, y });

    getWord(x, y);
  };

  const getWord = (x, y) => {
    if (directionSelection === "across") {
      const foundWord = settings.words
        .filter((word) => {
          return word.y === y;
        })
        .find((word) => {
          const [xMin, xMax] = word.x.split("-");
          return x <= Number(xMax) && x >= Number(xMin);
        });

      highLightWord(foundWord);
    }
  };

  const highLightWord = (word) => {
    //Clear previously highlighted letters
    clearSelection("selectedLetter");

    //Highlight letters of word
    const [xMin, xMax] = word.x.split("-");
    setCells((prevCells) =>
      prevCells.map((cell) => {
        return cell.x <= Number(xMax) &&
          cell.x >= Number(xMin) &&
          cell.y === word.y
          ? { ...cell, selectedLetter: true }
          : cell;
      })
    );

    setSelectedWord(word);
  };

  const selectLetter = (e) => {
    if (!selectedCell || e.key < "a" || e.key > "z") {
      return;
    }

    setCells((prevCells) =>
      prevCells.map((cell) => {
        if (cell.x === selectedCell.x && cell.y === selectedCell.y) {
          cell.letter = e.key;
        }
        return cell;
      })
    );
  };

  return (
    <>
      <header>
        <Header clues={settings.clues} selectedWord={selectedWord} />
      </header>
      <main>
        <section id="puzzle" tabIndex="0" onKeyDown={(e) => selectLetter(e)}>
          <svg viewBox="0 0 510 510">
            <g role="table">
              {cells.map((cell, i) => {
                return (
                  <Square
                    key={i}
                    {...squareSettings}
                    cell={cell}
                    selectSquare={selectSquare}
                  />
                );
              })}
            </g>
          </svg>
        </section>
        <section id="clues">
          <span>Across</span>
          <Clues selectedWord={selectedWord} clues={acrossClues} />
          <span>Down</span>
          <Clues selectedWord={selectedWord} clues={downClues} />
        </section>
      </main>
    </>
  );
};
