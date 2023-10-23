import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import SplashScreen from 'react-native-splash-screen';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  listenToBackgroundNotifications,
  listenToForegroundNotifications,
  onNotificationOpenedAppFromBackground,
  onNotificationOpenedAppFromQuit,
  requestUserPermission,
} from './src/services/NotificationService';

export default function App(): JSX.Element {
  useEffect(() => {
    const listenToNotifications = () => {
      try {
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    AppRegistry.registerComponent('app', () => App);

    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
