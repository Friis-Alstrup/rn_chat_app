import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import auth from '@react-native-firebase/auth';

export default function PressableLogoutIcon(): JSX.Element {
  return (
    <Pressable onPress={() => auth().signOut()}>
      <Icon name="logout" size={20} color="#fff" />
    </Pressable>
  );
}
