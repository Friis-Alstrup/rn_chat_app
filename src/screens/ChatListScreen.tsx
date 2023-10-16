import {FlatList, SafeAreaView} from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import {ScreenProp} from '../types/ScreenProp';
import ChatListItem from '../components/ChatListItem';

const DATA = [
  {
    chatRoom: 'Test',
    sender: 'Person 1',
    message:
      'askldl asdklæ askldklæ akldsla sdlæ asdjkaskljdjkla sdkjlakjlsdklj adl',
  },
  {
    chatRoom: 'Development',
    sender: 'Person 2',
    message: 'askldl asdklæ askldklæ akldsla sdlæ',
  },
  {
    chatRoom: 'Off-Topic',
    sender: 'Person 2',
    message: 'askldl asdklæ askldklæ akldsla sdlæ',
  },
];

export default function ChatListScreen({navigation}: ScreenProp): JSX.Element {
  useAuth(navigation);
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <ChatListItem
            chatRoom={item.chatRoom}
            sender={item.sender}
            message={item.message}
          />
        )}
      />
    </SafeAreaView>
  );
}
