import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
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
    // Logic to fetch messages from the data source
    const messages = await this.messageModel.find().exec();
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

