import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './models/user.model';

import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { Message, MessageSchema } from './models/message.model';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    SocketModule,
  ],
  controllers: [UsersController, MessagesController],
  providers: [UsersService, MessagesService, MessageGateway],
})
export class AppModule {}
