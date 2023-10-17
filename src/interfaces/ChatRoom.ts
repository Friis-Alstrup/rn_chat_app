import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface ChatRoom {
  chatRoomId: string;
  title: string;
  description: string;
  latestMessageTimestamp: FirebaseFirestoreTypes.Timestamp | null;
}
