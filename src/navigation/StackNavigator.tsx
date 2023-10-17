import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatListScreen from '../screens/ChatListScreen';
import {StackParamList} from '../types/StackParamList';
import PressableLogoutIcon from '../components/PressableLogoutIcon';

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e85c54',
        },
        headerTitleStyle: {
          color: '#ffffff',
        },
        headerTintColor: '#ffffff',
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={() => ({
          headerTitle: 'Pentia Chat',
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => <PressableLogoutIcon />,
        })}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}
