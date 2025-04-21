import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./message";

export class Game {

    public player1: WebSocket;
    public player2: WebSocket;
    public Board:Chess;
    private startTime: Date;
    private moveCount = 0; 


    constructor (player1:WebSocket, player2:WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.Board = new Chess();
        this.startTime = new Date() ;
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload : {
                color : 'white',
        }}));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload : {
                color : 'black',
        }}));
    }

    
    makeMove(socket: WebSocket, move: {
        from :string,
        to :string,
    }) {

        console.log("make move working")
        // Validate the move using ZOD

        if(this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }

        if(this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }

        try{
            this.Board.move(move);
        }catch (e) {
            console.error(e)
            return;
        }   

        console.log("make move working 2")
        
        if(this.Board.isGameOver()) {
            this.player1.send(JSON.stringify({type: GAME_OVER ,
                payload : {
                    winner : this.Board.turn() === 'w' ? 'black' : 'white',
                }}));
            this.player2.send(JSON.stringify({type: GAME_OVER ,
                payload : {
                    winner : this.Board.turn() === 'w' ? 'black' : 'white',
                }}));
           return;
        }
        console.log("here1")

        if(this.moveCount % 2 === 0){
            console.log("here2")
            this.player2.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }else {
            console.log("here3")
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }

        //Uodate the board
        // Push the move 

        // Check if the game is over

        // Send the updated board to both players
        this.moveCount++;

    }
}