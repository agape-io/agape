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
import {
  getUserChats,
  getNotifications,
  isReadNotification,
} from '../utils';
import { ThreadRow } from '../components';

const AllChats = ({ navigation }: any) => {
  const [chats, setChats] = useState<any>();
  const isMounted = useRef<any>(null);

  //const navigation = useNavigation();
  const { authData, notification, setNotification } = useAuth();
  const { userId, token } = authData;

  // fetch any notifications
  const fetchNotifications = async () => {
    getNotifications(userId, token)
      .then(res => {
        const { data } = res;
        // get notification id
        console.log('notifs', data);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  }

  // check if thread is unread
  const isThreadUnread = (notificationId: any) => {
    isReadNotification(notificationId, token)
      .then((res: any) => {
        const { data } = res;
        console.log('isRead', data);
      })
      .catch((e: any) => {
        console.error(e.message);
      })
  }

  // fetch all user chats 
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
        console.log(chatArr);
        setChats(chatArr);
      })
      .catch(e => {
        // throw error
        console.error(e.message);
      });
  }
  
  // persist on screen
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
              image={item.latestMessage.chattedUser.profile.photo}
              name={item.latestMessage.chattedUser.profile.name}
              latestMessage={item.latestMessage.content}
              unread={false}
            />
          )}
        />
      ) : (
        <Text style={{textAlign: "center", marginTop: 200}}>No messages available :(</Text>
      )}
    </>
  );
}

export default AllChats;