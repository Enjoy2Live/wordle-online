import React from "react";
import GridItem from "./GridItem";
import Row from "./Row";

const Grid = ({ roomState: { state }, plr, curPlr }) => {
  console.log({ state, plr });
  return (
    <div className={`grid grid-rows-6 gap-5 py-3 justify-center lg:gap-8`}>
      {state.guess[plr.id].map((row, rowIndex) => (
        <>
          <Row
            key={rowIndex}
            className={
              state.attempt[plr.id] === rowIndex ? "animate-pulse" : ""
            }
          >
            {row.map((letter, letterIndex) => (
              <GridItem
                key={letterIndex}
                letter={letter}
                plr={plr}
                curPlr={curPlr}
                state={state}
                rowIndex={rowIndex}
                letterIndex={letterIndex}
              />
            ))}
          </Row>
        </>
      ))}
    </div>
  );
};

export default Grid;
