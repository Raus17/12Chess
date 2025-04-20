import { WebSocket } from "ws";

export class Game {

    public player1: WebSocket;
    public player2: WebSocket;
    private Board: string;
    private moves: string[];
    private startTime: Date;

    constructor (player1:WebSocket, player2:WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.Board = '';
        this.moves = [];
        this.startTime = new Date() ;
    }

    makeMove(socket: WebSocket, move: string) {
        // Validation Here
        // IS user move 
        // is the move valid


        //Uodate the board
        // Push the move 

        // Check if the game is over

        // Send the updated board to both players

    }
}