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
import { isJSDocReadonlyTag } from 'typescript';

const AllChats = ({ navigation }: any) => {
  const [chats, setChats] = useState<any>([]);
  const [notificationIds, setNotificationIds] = useState<any>([]);
  const [isRead, setIsRead] = useState<any>(false);
  const isMounted = useRef<any>(null);

  const { authData } = useAuth();
  const { userId, token } = authData;

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
    // get every notification id
    let matchedChatNotif = notificationIds.find((notifs: any) => {
      return notifs.chatId === notification.latestMessage.chat
        && notifs.text === notification.latestMessage.content;
    });

    // should never return undefined...
    console.log('matched', matchedChatNotif);
    console.log('isRead?', matchedChatNotif?.read);
    console.log('id', matchedChatNotif?._id);

    // handle undefined

    // if the notification is found, set it to unread
    // if (matchedChatNotif.read === false) {
    //   // not read
    //   setIsRead(false);
    //   return isRead;
    // } else if (matchedChatNotif.read === true) {
    //   // is already read, run the function
    //   // isReadNotification(matchedChatNotif?._id, token)
    //   //   .then(() => {
    //   //     setIsRead(true);
    //   //     console.log('done!');
    //   //     return isRead;
    //   // })
    //   // .catch((e: any) => {
    //   //   console.error(e.message);
    //   // });
    //   setIsRead(true);
    //   return isRead;
    // }
  }
  
  // persist on screen CHATS
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

  // persist on screen NOTIFS
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
      isMounted.current = true;

      return () => {
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