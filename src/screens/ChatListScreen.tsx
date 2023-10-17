import {FlatList, RefreshControl, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAuth from '../hooks/useAuth';
import {ScreenProp} from '../types/ScreenProp';
import ChatListItem from '../components/ChatListItem';
import {getAllChatRooms} from '../services/GoogleFirestoreService';
import {ChatRoom} from '../interfaces/ChatRoom';

export default function ChatListScreen({navigation}: ScreenProp): JSX.Element {
  useAuth(navigation);

  const [chatRooms, SetChatRooms] = useState<ChatRoom[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    SetChatRooms(await getAllChatRooms());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
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
