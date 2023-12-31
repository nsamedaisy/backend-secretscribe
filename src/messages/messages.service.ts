import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../models/message.model';
import { User, UserDocument } from '../models/user.model';
import { UsersService } from '../users/users.service';
import { Socket } from 'socket.io';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly usersService: UsersService,
  ) {}

  async sendAnonymousMessage(recipient: string, content: string) {
    const sender = 'Anonymous'; // or fetch the sender's username from the authenticated user

    const newMessage = new this.messageModel({ sender, recipient, content });
    const savedMessage = await newMessage.save();

    // Get the recipient's user record
    const recipientUser = await this.userModel.findOne({ username: recipient });

    // Emit a real-time notification to the recipient using Socket.IO
    if (recipientUser && recipientUser.socketId) {
      const payload = { message: savedMessage };
      // Replace 'newMessage' with the actual event name used in the MessageGateway
      this.usersService.emitToSocket(recipientUser.socketId, 'newMessage', payload);
    }

    return savedMessage;
  }
}