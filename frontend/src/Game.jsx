import React, { useState, useEffect, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import client from "@urturn/client";
import Grid from "./Grid/Grid";
import toast from "react-hot-toast";

function Game() {
  const [roomState, setRoomState] = useState(client.getRoomState());
  let keyboardRef = useRef(null);

  const [curPlr, setCurPlr] = useState();
  console.log("curPlr:", curPlr);

  // load current player, which is initially null
  useEffect(() => {
    const setupCurPlr = async () => {
      const newCurPlr = await client.getLocalPlayer();
      setCurPlr(newCurPlr);
    };
    setupCurPlr();
  }, []);

  // setup event listener for updating roomState when client fires
  useEffect(() => {
    const onStateChanged = (newBoardGame) => {
      setRoomState(() => ({ ...newBoardGame }));
    };
    client.events.on("stateChanged", onStateChanged);
    return () => {
      client.events.off("stateChanged", onStateChanged);
    };
  }, []);

  if (!curPlr | !roomState?.state)
    return <h1 className="text-white text-center">Now Loading...</h1>;
  if (roomState.state.status === "pre-game")
    return (
      <h1 className="text-white text-center">
        Waiting for other players to join...
      </h1>
    );
  return (
    <div>
      <div>
        <Grid
          plr={roomState.players.filter((plr) => plr.id !== curPlr.id)[0]}
          curPlr={curPlr}
          roomState={roomState}
        />
        <hr />
      </div>
      <Grid curPlr={curPlr} plr={curPlr} roomState={roomState} />
      <div className="max-w-96 mx-auto">
        <Keyboard
          theme="hg-theme-default bg-slate-400"
          layout={{
            default: [
              "Q W E R T Y U I O P",
              "A S D F G H J K L",
              "Z X C V B N M",
              "{ent} {backspace}",
            ],
          }}
          display={{
            "{ent}": "ENTER",
            "{backspace}": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-delete"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>`,
          }}
          keyboardRef={(r) => (keyboardRef.current = r)}
          onChange={async (input) => {
            console.log(input);
            await client.makeMove({ guess: input });
          }}
          maxLength={5}
          onKeyPress={async (btn) => {
            if (btn === "{ent}") {
              const { error } = await client.makeMove({ attempt: 1 });
              error
                ? toast.error(error.message)
                : keyboardRef.current.clearInput();
            }
          }}
          newLineOnEnter={false}
        />
      </div>
    </div>
  );
}

export default Game;
