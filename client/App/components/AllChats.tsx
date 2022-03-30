/**
 * All Chats Component
 */
import React, {
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../context';
import {
  getUserChats,
  getNotifications,
  isReadNotification,
} from '../utils';
import { ThreadRow } from '../components';

const AllChats = ({ navigation }: any) => {
  const [chats, setChats] = useState<any>();
  const [notificationIds, setNotificationIds] = useState<any>();
  const isMounted = useRef<any>(null);

  const { authData } = useAuth();
  const { userId, token } = authData;

  // fetch any notifications
  const fetchNotifications = async () => {
    getNotifications(userId, token)
      .then(res => {
        // get notification ids
        const notifIds = res.data.map((notifs: any) => {
          let notifsObj = {
            _id: notifs._id,
            chatId: notifs.chat._id,
          }
          return notifsObj;
        });

        setNotificationIds(notifIds);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  }

  // check if thread is unread
  const isThreadUnread = (notificationId: any) => {
    // get every notification id 
    console.log(userId, notificationId);
    
    // check if notif id matches with chat id
    //console.log('noti id from function', notificationId);

    // if there are ids, set the specified chatId to true
    
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
      fetchNotifications();
      isMounted.current = true;

      return () => {
        setChats([]);
        setNotificationIds([]);
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
              unread={isThreadUnread(notificationIds)}
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