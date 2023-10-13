import {View, Text, Button} from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';
import {ScreenProp} from '../types/ScreenProp';
import auth from '@react-native-firebase/auth';

export default function ChatListScreen({navigation}: ScreenProp): JSX.Element {
  useAuth(navigation);
  return (
    <View>
      <Text>ChatListScreen</Text>
      <Button
        title="Log ud"
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              navigation.navigate('Login');
            });
        }}
      />
    </View>
  );
}
