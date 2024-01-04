import { Schema, model, Document } from 'mongoose';

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<Message>({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const MessageModel = model<Message>('Message', messageSchema);