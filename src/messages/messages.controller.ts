import { Controller, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post(':recipient')
  sendAnonymousMessage(
    @Param('recipient') recipient: string,
    @Body('content') content: string,
  ) {
    return this.messagesService.sendAnonymousMessage(recipient, content);
  }
}