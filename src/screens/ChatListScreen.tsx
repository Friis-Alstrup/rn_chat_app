import {FlatList, RefreshControl, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAuth from '../hooks/useAuth';
import {ScreenProp} from '../types/ScreenProp';
import ChatListItem from '../components/ChatListItem';
import {ChatRoom} from '../interfaces/ChatRoom';
import {loadAllChatRooms} from '../services/ChatService';

export default function ChatListScreen({navigation}: ScreenProp): JSX.Element {
  useAuth(navigation);

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllChatRooms = async () => {
    setChatRooms(await loadAllChatRooms());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllChatRooms();
    setRefreshing(false);
  };

  useEffect(() => {
    getAllChatRooms();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={chatRooms}
        renderItem={({item}) => (
          <ChatListItem chatRoom={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
