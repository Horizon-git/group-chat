import { Message } from './Message';

export interface Room {
  id: number;
  name: string;
  lastMessage: Message;
}
