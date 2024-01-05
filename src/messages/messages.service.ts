import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Message } from './message.schema';
import { Message } from '../model/message.model';
import { CreateMessageDto } from './create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = new this.messageModel(createMessageDto);
    await message.save();
  }

  async getMessages(): Promise<Message[]> {
    const messages = await this.messageModel.find().exec();
    return messages;
  }

  async getAdditionalMessages(offset: number, limit: number): Promise<Message[]> {
    // Retrieve all the remaining messages after the specified offset
    const messages = await this.messageModel.find().skip(offset).limit(limit).exec();
    return messages;
  }
}


// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Message } from './message.schema';
// import { CreateMessageDto } from './create-message.dto';

// @Injectable()
// export class MessagesService {
//   constructor(
//     @InjectModel(Message.name) private readonly messageModel: Model<Message>,
//   ) {}

//   async createMessage(createMessageDto: CreateMessageDto) {
//     const message = new this.messageModel(createMessageDto);
//     await message.save();
//   }
// }

