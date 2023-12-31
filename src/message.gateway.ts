import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedSockets: Set<Socket> = new Set<Socket>();

  handleConnection(socket: Socket) {
    this.connectedSockets.add(socket);
  }

  handleDisconnect(socket: Socket) {
    this.connectedSockets.delete(socket);
  }

  emitToSocket(socketId: string, event: string, payload: any) {
    this.server.to(socketId).emit(event, payload);
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(socket: Socket, payload: any) {
    // Handle the new message event, e.g., emit a notification to the recipient's socket
  }
}