import {useLayoutEffect} from 'react';
import useAuthStore from '../stores/useAuthStore';
import auth from '@react-native-firebase/auth';
import {NavigationProp} from '@react-navigation/native';

export default function useAuth(navigation: NavigationProp<any>) {
  useLayoutEffect(() => {
    auth().onAuthStateChanged(user => {
      if (!user) {
        useAuthStore.getState().logout();
        navigation.navigate('Login');
      }
    });
  });
}
