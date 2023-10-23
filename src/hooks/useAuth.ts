import {useLayoutEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationProp} from '@react-navigation/native';

export default function useAuth(navigation: NavigationProp<any>) {
  useLayoutEffect(() => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate('Login');
      }
    });
  });
}
