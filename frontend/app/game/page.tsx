"use client"
import React, { use, useEffect } from 'react'
import ChessBoard from '../Components/ChessBoard';
import { Button } from '../Components/Button';
import { useSocket } from '../hooks/useSocket';
import {Chess} from 'chess.js'

//TODO : Move Togeather , there code repeated in the backend and frontend
export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';

const page = () => {
  const socket = useSocket();
  const [chess , setChess] = React.useState(new Chess());
  const [board , setBoard] = React.useState(chess.board());

  useEffect(() => {

    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);

      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess())
          setBoard(chess.board());
          console.log('Game initialized:', message.data);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log('Move made:', message.data);
          break;
        case GAME_OVER:
          console.log('Game over:', message.data);
          break;
    };
  }

  }, [socket])

  if (!socket) {
    return <div>Connecting...</div>
  }

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        {/* This grid contains both the board and the button side by side */}
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 flex bg-red-200 w-full">
            <ChessBoard board={board} />
          </div>
          <div className="col-span-2 bg-green-200 w-full flex items-center justify-center">
            <Button
              onClick={() => {
                socket.send(JSON.stringify({ type: INIT_GAME }));
                console.log('Start game');
              }}
            >
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default page