import firestore from '@react-native-firebase/firestore';
import {ChatRoom} from '../interfaces/ChatRoom';
import {Message} from '../interfaces/Message';

export const getAllChatRooms = async (): Promise<ChatRoom[]> => {
  const chatRoomIds: string[] = await getAllChatRoomIds();

  const chatRoomsData: ChatRoom[] = await Promise.all(
    chatRoomIds.map(async (chatRoomId: string) => {
      const chatRoomQuery = firestore().collection('chatrooms').doc(chatRoomId);

      const [chatRoomSnapshot, latestMessageSnapshot] = await Promise.all([
        chatRoomQuery.get(),
        chatRoomQuery
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get(),
      ]);

      const chatRoom = chatRoomSnapshot.data() as ChatRoom;
      const latestMessage = latestMessageSnapshot.docs[0]?.data() as Message;
      const latestMessageTimestamp = latestMessage?.timestamp ?? null;

      return {
        chatRoomId,
        title: chatRoom.title,
        description: chatRoom.description,
        latestMessageTimestamp,
      };
    }),
  );

  // Sort chat rooms by the latest message timestamp in descending order
  chatRoomsData.sort(
    (a, b) =>
      (b.latestMessageTimestamp?.toDate().getTime() ?? 0) -
      (a.latestMessageTimestamp?.toDate().getTime() ?? 0),
  );

  return chatRoomsData;
};

const getAllChatRoomIds = async () => {
  const chatRoomIds: string[] = [];
  await firestore()
    .collection('chatrooms')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        chatRoomIds.push(documentSnapshot.id);
      });
    });
  return chatRoomIds;
};
