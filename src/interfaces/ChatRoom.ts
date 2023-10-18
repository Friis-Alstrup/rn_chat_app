import {IMessage} from 'react-native-gifted-chat';

export interface ChatRoom {
  chatRoomId: string;
  name: string;
  description: string;
  latestMessage?: IMessage | null;
}
