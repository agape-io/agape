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
            user: notifs.user,
            createdAt: notifs.createdAt,
            read: notifs.read,
            text: notifs.text
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
  const isThreadUnread = (notification: any) => {
    //console.log('isThreadUnread', notification, 'ids', notificationIds);

    // compare messages with parsed notifications

    // // get every notification id
    let matchedChatNotif = notificationIds.some((notifs: any, index: any) => notifs.chatId === notification.latestMessage.chat);
    console.log('matched', matchedChatNotif);

    // if the notification is found, set it to unread
    // if (matchedChatNotif) {
    //   return true;
    // } else {
    //   // When user picks specified thread, set it to false on pressed
    //   // isReadNotification(matchedChatNotif._id, token)
    //   // .then(() => {
    //   // })
    //   // .catch((e: any) => {
    //   //   console.error(e.message);
    //   // });

    //   return false;
    // }
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
              unread={isThreadUnread(item)}
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