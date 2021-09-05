import React from "react";

export const Header = ({ clues, selectedWord }) => {
  let selectedClue;
  if (selectedWord) {
    selectedClue = clues.find((clue) => clue.word === selectedWord.id);
  }
  return selectedClue ? (
    <p>
      <strong>
        {selectedClue.number} {!selectedClue.direction ? "Across" : "Down"}
      </strong>{" "}
      | {selectedClue.text}
    </p>
  ) : null;
};
