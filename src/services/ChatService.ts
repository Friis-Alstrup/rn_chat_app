import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {ChatRoom} from '../interfaces/ChatRoom';

const chatRoomsCollection = firestore().collection('chatrooms');

export const loadAllChatRooms = async () => {
  const chatRooms: ChatRoom[] = [];

  const chatRoomSnapshots = await chatRoomsCollection.get();

  const chatRoomPromises = chatRoomSnapshots.docs.map(async document => {
    const chatRoomData = document.data() as ChatRoom;
    chatRoomData.chatRoomId = document.id;

    // Fetch the most recent message for this chat room
    const messagesSnapshot = await chatRoomsCollection
      .doc(document.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (!messagesSnapshot.empty) {
      const latestMessage = messagesSnapshot.docs[0].data() as IMessage;
      chatRoomData.latestMessage = latestMessage;
    } else {
      chatRoomData.latestMessage = null;
    }

    chatRooms.push(chatRoomData);
  });

  await Promise.all(chatRoomPromises);

  chatRooms.sort((a, b) => {
    const dateA = a.latestMessage?.createdAt;
    const dateB = b.latestMessage?.createdAt;

    if (!dateA && !dateB) {
      return 0;
    }
    if (!dateA) {
      return 1;
    }
    if (!dateB) {
      return -1;
    }

    const timestampA = dateA instanceof Date ? dateA.getTime() : dateA;
    const timestampB = dateB instanceof Date ? dateB.getTime() : dateB;

    return timestampB - timestampA;
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
