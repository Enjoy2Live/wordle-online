import { useState, useEffect } from 'react'
import client from '@urturn/client'
import Grid from './Grid/Grid';

function Game() {
  const [roomState, setRoomState] = useState(client.getRoomState() || {});
  console.log("roomState:", roomState)

  // setup event listener for updating roomState when client fires
  useEffect(() => {
    const onStateChanged = (newBoardGame) => {
      setRoomState(newBoardGame);
    };
    client.events.on('stateChanged', onStateChanged);
    return () => {
      client.events.off('stateChanged', onStateChanged);
    };
  }, []);

  const [curPlr, setCurPlr] = useState();
  console.log("curPlr:", curPlr)

  // load current player, which is initially null
  useEffect(() => {
    const setupCurPlr = async () => {
      const newCurPlr = await client.getLocalPlayer();
      setCurPlr(newCurPlr);
    };
    setupCurPlr();
  }, []);

  return (
    <div>
      <Grid />
      <h1 className=''>TODO: Implement your game UI here!</h1>
      <p className=''>Current Plr: {curPlr?.username}</p>
    </div>
  );
}

export default Game;
