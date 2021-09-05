import React from "react";

export const Square = ({
  cell,
  size,
  numberPosXOffSet,
  numberPosYOffSet,
  letterPosXOffSet,
  letterPosYOffSet,
  selectSquare,
}) => {
  const x = Number(cell.x) === 1 ? 1 : (Number(cell.x) - 1) * size;
  const y = Number(cell.y) === 1 ? 1 : (Number(cell.y) - 1) * size;
  return (
    <g className="square">
      {cell.solution ? (
        <>
          <rect
            className="square__selectable"
            x={x}
            y={y}
            width={size}
            height={size}
            fill={
              cell.selectedCell
                ? "#FFDE70"
                : cell.selectedLetter
                ? "#B4EAFE"
                : "#FFF"
            }
            onClick={() => selectSquare(cell.x, cell.y)}
          ></rect>
          <text
            className="square__number"
            x={Number(cell.x) === 1 ? numberPosXOffSet : x + numberPosXOffSet}
            y={Number(cell.y) === 1 ? numberPosYOffSet : y + numberPosYOffSet}
          >
            {cell.number}
          </text>
          <text
            className="square__letter"
            x={Number(cell.x) === 1 ? letterPosXOffSet : x + letterPosXOffSet}
            y={Number(cell.y) === 1 ? letterPosYOffSet : y + letterPosYOffSet}
            onClick={() => selectSquare(cell.x, cell.y)}
          >
            {cell.letter?.toUpperCase() || ""}
          </text>
        </>
      ) : (
        <rect x={x} y={y} width={size} height={size}></rect>
      )}
    </g>
  );
};
