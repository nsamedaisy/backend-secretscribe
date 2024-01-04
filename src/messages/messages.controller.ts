import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateMessageDto } from './create-message.dto';
import { MessagesService } from './messages.service';
import { Message } from '../model/message.model';
import { Model } from 'mongoose';

@Controller('api/messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly messageModel: Model<Message>,
  ) {}

  // @Post()
  // async createMessage(@Body() createMessageDto: CreateMessageDto) {
  //   try {
  //     console.log('Received message:', createMessageDto);

  //     await this.messagesService.createMessage(createMessageDto);

  //     console.log('Message sent successfully');
  //     return { success: true };
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     throw error;
  //   }
  // }
  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    try {
      console.log('Received message:', createMessageDto);

      const newMessage = new this.messageModel(createMessageDto);
      await newMessage.save();

      console.log('Message sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // @Get()
  // async getMessages() {
  //   try {
  //     const messages = await this.messagesService.getMessages();
  //     return { messages };
  //   } catch (error) {
  //     console.error('Error fetching messages:', error);
  //     throw error;
  //   }
  // }

  @Get()
  async getMessages() {
    try {
      const messages = await this.messageModel.find();
      return { messages };
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
}

// import { Controller, Post, Body } from '@nestjs/common';
// import { CreateMessageDto } from './create-message.dto';
// import { MessagesService } from './messages.service';

// @Controller('api/messages')
// export class MessagesController {
//   constructor(private readonly messagesService: MessagesService) {}

//   @Post()
//   async createMessage(@Body() createMessageDto: CreateMessageDto) {
//     await this.messagesService.createMessage(createMessageDto);
//   }
// }
