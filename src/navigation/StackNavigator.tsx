import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ChatListScreen from '../screens/ChatListScreen';
import {StackParamList} from '../types/StackParamList';
import PressableLogoutIcon from '../components/PressableLogoutIcon';

const logoutIcon = () => <PressableLogoutIcon />;

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#173448',
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
          headerRight: () => logoutIcon(),
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({route}) => ({title: route.params.chatRoomId})}
      />
    </Stack.Navigator>
  );
}
