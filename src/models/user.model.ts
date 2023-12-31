import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserDocument extends Document {
    // Other user properties...
    socketId: string;
  }

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Add any additional fields as per your requirements

  // ...
}

export const UserSchema = SchemaFactory.createForClass(User);

