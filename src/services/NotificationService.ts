import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {createNotificationAllowanceAlert} from '../helpers/AlertHelper';

const chatRoomsCollection = firestore().collection('chatrooms');

export const requestUserPermission = async () => {
  //Request Android permission (For API level 33+, for 32 or below is not required)
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
};

export const getFCMToken = async (): Promise<string> => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    return fcmToken;
  } else {
    console.log('Failed', 'No token received');
    return '';
  }
};

export const listenToForegroundNotifications = async () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log(
      'A new message arrived! (FOREGROUND)',
      JSON.stringify(remoteMessage),
    );
  });
  return unsubscribe;
};

export const listenToBackgroundNotifications = async () => {
  const unsubscribe = messaging().setBackgroundMessageHandler(
    async remoteMessage => {
      console.log(
        'A new message arrived! (BACKGROUND)',
        JSON.stringify(remoteMessage),
      );
    },
  );
  return unsubscribe;
};

export const onNotificationOpenedAppFromBackground = async () => {
  const unsubscribe = messaging().onNotificationOpenedApp(
    async remoteMessage => {
      console.log(
        'App opened from BACKGROUND by tapping notification:',
        JSON.stringify(remoteMessage),
      );
    },
  );
  return unsubscribe;
};

export const onNotificationOpenedAppFromQuit = async () => {
  const message = await messaging().getInitialNotification();

  if (message) {
    console.log(
      'App opened from QUIT by tapping notification:',
      JSON.stringify(message),
    );
  }
};

export const checkIfFCMTokenExists = async (
  chatRoomId: string,
  fcmToken: string,
) => {
  const token = await chatRoomsCollection
    .doc(chatRoomId)
    .collection('tokens')
    .where('token', '==', fcmToken)
    .get();

  if (token.docs.length === 0) {
    createNotificationAllowanceAlert(chatRoomId);
  }
};

export const addFCMTokenToChatRoom = async (
  chatRoomId: string,
  fcmToken: string,
  isNotificationsAllowed: boolean,
) => {
  await chatRoomsCollection.doc(chatRoomId).collection('tokens').add({
    token: fcmToken,
    isNotificationsAllowed: isNotificationsAllowed,
  });
};
