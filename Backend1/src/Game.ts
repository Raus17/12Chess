import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, MOVE } from "./message";

export class Game {

    public player1: WebSocket;
    public player2: WebSocket;
    public Board:Chess;
    private moves: string[];
    private startTime: Date;

    constructor (player1:WebSocket, player2:WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.Board = new Chess();
        this.moves = [];
        this.startTime = new Date() ;
    }

    makeMove(socket: WebSocket, move: {
        from :string,
        to :string,
    }) {
        // Validate the move using ZOD

        if(this.Board.moves.length % 2 === 0 && socket !== this.player1) {
            return;
        }

        if(this.Board.moves.length % 2 === 1 && socket !== this.player2) {
            return;
        }

        try{
            this.Board.move(move);
        }catch (e) {
            return;
        }   
        
        if(this.Board.isGameOver()) {
            this.player1.emit(JSON.stringify({type: GAME_OVER ,
                payload : {
                    winner : this.Board.turn() === 'w' ? 'black' : 'white',
                }}));
           return;
        }

        if(this.Board.move.length % 2 === 0){
            this.player2.emit(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }else {
            this.player1.emit(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }

        //Uodate the board
        // Push the move 

        // Check if the game is over

        // Send the updated board to both players

    }
}