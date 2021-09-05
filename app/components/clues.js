import React, { useRef } from "react";

export const Clues = ({ clues, selectedWord }) => {
  const cluesRefs = useRef([]);

  if (selectedWord) {
    cluesRefs.current.forEach((ref) => [
      ref.classList.remove("clues__item--selected"),
    ]);

    const targetClue = cluesRefs.current.find(
      (ref) => ref.id === selectedWord.id
    );
    if (targetClue) {
      targetClue.scrollIntoView({ behavior: "smooth" });
      targetClue.classList.add("clues__item--selected");
    }
  }

  return (
    <ul className="clues__list">
      {clues.map((clue, i) => {
        return (
          <li
            className="clues__item"
            id={clue.word}
            ref={(el) => (cluesRefs.current[i] = el)}
            key={i}
          >
            <span>{clue.number}</span> {clue.text}
          </li>
        );
      })}
    </ul>
  );
};
