import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../model/message.model';

@WebSocketGateway()
export class MyGateway {
  @WebSocketServer()
  server: Server;

  constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) {}

  // ... other methods ...

  async handleLoadMore(client: Socket) {
    try {
      // Fetch additional messages from the database
      const additionalMessages = await this.messageModel.find().limit(10);

      // Emit the additional messages to the client
      client.emit('message', additionalMessages);
    } catch (error) {
      console.error('Error fetching additional messages:', error);
      throw error;
    }
  }
}