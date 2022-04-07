/**
 * All Chats Component
 */
import React, {
  useState,
  useRef,
  useCallback
} from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import {
  useNavigation,
  useFocusEffect
} from '@react-navigation/native';

import { useAuth } from '../context';
import { getUserChats } from '../utils';
import {
  RecentMessage,
  ThreadRow
} from '../components';

const AllChats = () => {
  const [chats, setChats] = useState<any>();
  const isMounted = useRef<any>(null);

  const navigation = useNavigation();

  const { authData } = useAuth();
  const { userId, token } = authData;

  const fetchChats = async () => {
    getUserChats(userId, token)
      .then(res => {
        // gets all user messages
        let chatArr = res.data.map((chat: any, index: any) => {
          // find the users that don't match with curr user
          let foundUser = chat.users.find((item: any) => item._id !== userId);

          let c = {
            _id: chat._id,
            latestMessage: {
              _id: chat.latestMessage._id,
              chat: chat.latestMessage.chat,
              content: chat.latestMessage.content,
              createdAt: chat.latestMessage.createdAt,
              chattedUser: foundUser,
              sender: chat.latestMessage.sender,
              updatedAt: chat.latestMessage.updatedAt
            },
            updatedAt: chat.updatedAt
          }

          return c;
        });
        // set chats
        setChats(chatArr);
      })
      .catch(e => {
        // throw error
        console.error(e.response.data.message);
      });
  }
  
  useFocusEffect(
    useCallback(() => {
      fetchChats();
      isMounted.current = true;

      return () => {
        setChats([]);
        isMounted.current = false;
      }
    }, [])
  );

  return (
    <>
      {chats ? (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <ThreadRow
              onPress={() => navigation.navigate('Message', {
                chatId: item._id,
                name: item.latestMessage.chattedUser.profile.name,
              })}
            >
              <RecentMessage
                image={item.latestMessage.chattedUser.profile.photo}
                name={item.latestMessage.chattedUser.profile.name}
                latestMessage={item.latestMessage.content}
              />
            </ThreadRow>
          )}
        />
      ) : (
        <Text style={{textAlign: "center", marginTop: 200}}>No messages available :(</Text>
      )}
    </>
  );
}

export default AllChats;