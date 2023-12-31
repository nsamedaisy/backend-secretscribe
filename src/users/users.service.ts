import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';

import { Socket } from 'socket.io';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username }).exec();
  }

  emitToSocket(socketId: string, event: string, payload: any) {
    // Implementation to emit an event to the specified socket using Socket.IO
    // Example:
    // socket.to(socketId).emit(event, payload);
  }

  // Implement other user-related operations as needed
}
