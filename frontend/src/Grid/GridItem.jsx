import { useMemo } from "react";

function handleTile(letter, word, letterIndex) {
  if (word.includes(letter) && word[letterIndex] === letter) {
    return "bg-green-500 text-black";
  } else if (word.includes(letter)) {
    return "bg-yellow-500 text-black";
  } else if (letter !== " ") {
    return "bg-gray-500";
  } else {
    return "bg-transparent";
  }
}

const GridItem = ({ letter, state, letterIndex, rowIndex, plr, curPlr }) => {
  const bgColor = useMemo(
    () => handleTile(letter, state.word, letterIndex),
    [letter, letterIndex, state.word]
  );
  return (
    <div
      className={`flex justify-center items-center text-white border border-solid border-white w-8 h-8 ${
        plr.id !== curPlr.id
          ? bgColor
          : rowIndex < state.attempt[curPlr.id] || state.winner
          ? bgColor
          : ""
      }`}
    >
      {plr.id === curPlr.id ? letter : " "}
    </div>
  );
};

export default GridItem;
