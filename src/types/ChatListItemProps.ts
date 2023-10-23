import {NavigationProp} from '@react-navigation/native';
import {ChatRoom} from '../interfaces/ChatRoom';

export type ChatListItemProps = {
  chatRoom: ChatRoom;
  navigation: NavigationProp<any>;
};
