// tip: docs @ https://docs.urturn.app/docs/API/backend#functions

function onRoomStart(roomState) {
  const { logger } = roomState;
  logger.info("Start called");
  logger.warn(
    "TODO: implement what the state of the room looks like initially"
  );
  return {
    state: {
      word: "HELLO",
      status: "pre-game",
      guess: {},
      attempt: {},
      result: {},
      winner: null,
    },
  };
}

function onPlayerJoin(player, roomState) {
  const { logger, players, state } = roomState;
  logger.info("Join called with:", { player, roomState });
  logger.warn(
    "TODO: implement how to change the roomState when a player joins"
  );
  state.guess[players[0].id] = [
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
  ];
  state.attempt[players[0].id] = 0;
  state.result[players[0].id] = [
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
  ];
  if (players.length === 2) {
    state.guess[players[1].id] = [
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    state.attempt[players[1].id] = 0;
    state.result[players[1].id] = [
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
    ];
    state.status = "in-game";
    return {
      state,
      joinable: false,
    };
  }
  return {};
}

function onPlayerQuit(player, roomState) {
  const { logger, players, state } = roomState;
  logger.info("Quit called with:", { player, roomState });
  logger.warn(
    "TODO: implement how to change the roomState when a player quits the room"
  );
  state.status = "end-game";
  if (players.length === 1) {
    const [winner] = players;
    state.winner = winner;
    return {
      state,
      joinable: false,
      finished: true,
    };
  }
  return {
    state,
    joinable: false,
    finished: true,
  };
}

function onPlayerMove(player, move, roomState) {
  const { logger, state } = roomState;

  logger.warn({ move });
  if (typeof move.guess === "string") {
    state.guess = {
      ...state.guess,
      [player.id]: state.guess[player.id].map((guessArr, i) => {
        if (i !== state.attempt[player.id]) return guessArr;
        const newGuess = move.guess.split("");
        return [...newGuess, ...new Array(5 - newGuess.length).fill(" ")];
      }),
    };
  }

  if (typeof move.attempt === "number") {
    // Check if the player submitted five letters word
    if (
      state.guess[player.id][state.attempt[player.id]].some(
        (letter) => letter === " "
      )
    ) {
      throw new Error("You need to type a word of 5 letters");
    }

    // Check if the player won
    if (
      state.guess[player.id][state.attempt[player.id]].join("") === state.word
    ) {
      state.winner = player;
      state.finished = true;
      state.status = "end-game";
      return {
        state,
      };
    }
    state.attempt[player.id] += move.attempt;
  }
  return {
    state,
  };
}

// Export these functions so UrTurn runner can run these functions whenever the associated event
// is triggered. Follow an example flow of events: https://docs.urturn.app/docs/Introduction/Flow-Of-Simple-Game
export default {
  onRoomStart,
  onPlayerJoin,
  onPlayerQuit,
  onPlayerMove,
};
