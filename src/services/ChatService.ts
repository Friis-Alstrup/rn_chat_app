import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {ChatRoom} from '../interfaces/ChatRoom';

const chatRoomsCollection = firestore().collection('chatrooms');

export const loadAllChatRooms = async () => {
  const chatRooms: ChatRoom[] = [];
  await chatRoomsCollection.get().then(querySnapshot => {
    querySnapshot.forEach(document => {
      const chatRoomData = document.data() as ChatRoom;
      chatRoomData.chatRoomId = document.id;
      chatRooms.push(chatRoomData);
    });
  });

  return chatRooms;
};

export const loadMessages = (
  chatRoomId: string,
  lastDocument: FirebaseFirestoreTypes.DocumentData | undefined,
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
  setLastDocument: React.Dispatch<
    React.SetStateAction<FirebaseFirestoreTypes.DocumentData | undefined>
  >,
) => {
  const query = chatRoomsCollection
    .doc(chatRoomId)
    .collection('messages')
    .orderBy('createdAt', 'desc');

  if (lastDocument !== undefined) {
    query.startAfter(lastDocument);
  }

  const unsubscribe = query.limit(5).onSnapshot(querySnapshot => {
    const messagesArray: IMessage[] = querySnapshot.docs.map(doc => {
      const message = doc.data();
      return {
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt.toDate(),
        user: {
          _id: message.user._id,
          name: message.user.name,
          avatar: message.user.avatar,
        },
      };
    });

    setMessages(messagesArray);

    if (querySnapshot.docs.length > 0) {
      setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
    }
  });

  return () => unsubscribe();
};

export const sendMessage = async (
  chatRoomId: string,
  newMessages: IMessage[],
) => {
  await chatRoomsCollection
    .doc(chatRoomId)
    .collection('messages')
    .add(newMessages[0]);
};
