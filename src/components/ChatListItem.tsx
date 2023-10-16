import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {ChatListItemProps} from '../types/ChatListItemProps';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ChatListItem({
  chatRoom,
  sender,
  message,
}: ChatListItemProps) {
  return (
    <Pressable>
      <View style={styles.item}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {chatRoom.substring(0, 1).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.itemTitle}>{chatRoom}</Text>
          <Text style={styles.itemMessage}>
            {sender}: {message}
          </Text>
        </View>
        <View>
          <Icon name="chevron-right" size={25} color="#252525" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#b0b0b0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  itemTitle: {
    color: '#252525',
    fontSize: 16,
    fontWeight: '600',
  },
  itemMessage: {
    width: 260,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#b44741',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
