import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    this.server.emit('message', payload); // Broadcast the received message to all connected clients
  }

  handleConnection(client: any, ...args: any[]) {
    // Handle client connection
  }

  handleDisconnect(client: any) {
    // Handle client disconnection
  }
}
