import {Alert} from 'react-native';
import {
  addFCMTokenToChatRoom,
  getFCMToken,
} from '../services/NotificationService';

export const createErrorAlert = (errorMessage: string) => {
  Alert.alert('Ups!', errorMessage, [{text: 'OK'}]);
};

export const createNotificationAllowanceAlert = async (chatRoomId: string) => {
  const fcmToken = await getFCMToken();

  if (fcmToken) {
    Alert.alert(
      'Tillad notifikationer',
      'Ønsker du at modtage notifikationer fra dette chat rum?',
      [
        {
          text: 'Nej',
          onPress: async () =>
            addFCMTokenToChatRoom(chatRoomId, fcmToken, false),
        },
        {
          text: 'Ja',
          onPress: async () =>
            addFCMTokenToChatRoom(chatRoomId, fcmToken, true),
        },
      ],
    );
  }
};
