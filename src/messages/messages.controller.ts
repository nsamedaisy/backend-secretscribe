import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateMessageDto } from './create-message.dto';
import { MessagesService } from './messages.service';
import { Message } from '../model/message.model';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    try {
      console.log('Received message:', createMessageDto);
  
      const messageData = {
        timeSent: new Date(),
        content: createMessageDto.message,
        message: createMessageDto.message, // Add the 'message' property
      };
  
      await this.messagesService.createMessage(messageData);
  
      console.log('Message sent successfully');
      return { success: true };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
 
  @Get()
  async getMessages() {
    try {
      const messages = await this.messagesService.getMessages();
      return { messages };
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  @Get('load')
  async loadMoreMessages(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Message[]> {
    const additionalMessages = await this.messagesService.getAdditionalMessages(
      offset,
      limit,
    );
  
    return additionalMessages;
  }

}



   // @Post()
  // async createMessage(@Body() createMessageDto: CreateMessageDto) {
  //   try {
  //     console.log('Received message:', createMessageDto);

  //     const newMessage = new this.messageModel(createMessageDto);
  //     await newMessage.save();

  //     console.log('Message sent successfully');
  //     return { success: true };
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     throw error;
  //   }
  // }


//   @Get()
//   async getMessages() {
//     try {
//       const messages = await this.messageModel.find();
//       return { messages };
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       throw error;
//     }
//   }
// }

