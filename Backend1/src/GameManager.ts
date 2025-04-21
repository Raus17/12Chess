import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";
import { Game } from "./Game";


export class GameManager {
    private games : Game[];
    private pendingUsers : WebSocket | null;
    private users : WebSocket[];

    constructor(){
        this.games = [];
        this.pendingUsers = null;   
        this.users = [];
    } 
    addUser(socket : WebSocket){
        this.users.push(socket);
        this.addHandler(socket); 
    }

    removeUser(socket : WebSocket){
        this.users = this.users.filter((user) => user !== socket);
    }

    private addHandler (socket : WebSocket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === INIT_GAME) {
               if(this.pendingUsers) {
                    // Start a game
                    const game = new Game(this.pendingUsers, socket);
                    this.games.push(game);
                    this.pendingUsers = null;

               }else {
                    this.pendingUsers = socket ;
               }

               console.log("MOVE HAPPENING ?")


               if(message.type === MOVE) {

                console.log("MOVE cdz ?")
                // Handle move message
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    console.log("MOVE proceeded")
                    // Process the move in the game
                    game.makeMove(socket ,  message.move);
                }
               }
            } 
        });
    }
}