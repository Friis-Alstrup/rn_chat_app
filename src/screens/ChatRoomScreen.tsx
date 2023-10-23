import React, {useState, useEffect} from 'react';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {ScreenProp} from '../types/ScreenProp';
import {ChatRoom} from '../interfaces/ChatRoom';
import useAuth from '../hooks/useAuth';
import auth from '@react-native-firebase/auth';
import {loadMessages, sendMessage} from '../services/ChatService';
import {
  checkIfFCMTokenExists,
  getFCMToken,
} from '../services/NotificationService';

export default function ChatRoomScreen({
  route,
  navigation,
}: ScreenProp): JSX.Element {
  useAuth(navigation);
  const {chatRoomId} = route.params as ChatRoom;
  const currentUser = auth().currentUser;

  const [lastDocument, setLastDocument] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >(undefined);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const getMessages = async () => {
    const unsubscribe = loadMessages(
      chatRoomId,
      lastDocument,
      setMessages,
      setLastDocument,
    );

    return () => {
      unsubscribe();
    };
  };

  const onSend = async (newMessages: IMessage[]) => {
    await sendMessage(chatRoomId, newMessages);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  };

  const checkToken = async () => {
    checkIfFCMTokenExists(chatRoomId, await getFCMToken());
  };

  useEffect(() => {
    checkToken();
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      dateFormat="ddd HH:mm"
      timeFormat="HH:mm"
      showUserAvatar={true}
      loadEarlier={true}
      onLoadEarlier={async () => getMessages()}
      user={{
        _id: currentUser?.email || '',
        name: currentUser?.displayName || '',
        avatar: currentUser?.photoURL || '',
      }}
    />
  );
}
