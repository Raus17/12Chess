import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8040 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
  gameManager.addUser(ws)

  ws.on('disconnect' , () => gameManager.removeUser(ws));
});