import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatListScreen from '../screens/ChatListScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e85c54',
        },
        headerTitleStyle: {
          color: '#ffffff',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}
