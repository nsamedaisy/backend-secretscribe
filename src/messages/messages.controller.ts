
import { Controller, Post, Body } from '@nestjs/common';
import { CreateMessageDto } from './create-message.dto';
import { MessagesService } from './messages.service';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    await this.messagesService.createMessage(createMessageDto);
  }
}