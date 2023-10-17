import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface Message {
  message: string;
  sender: string;
  timestamp: FirebaseFirestoreTypes.Timestamp;
}
