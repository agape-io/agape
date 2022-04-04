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
  const [chats, setChats] = useState<any>([]);
  const [notificationIds, setNotificationIds] = useState<any>([]);
  const [unread, setUnread] = useState<boolean>(false);
  const [matchedNotifId, setMatchedNotifId] = useState<any>(null);
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
        // get notification ids\
        const notifIds = res.data.map((notifs: any) => {
          // retrieved message cannot be the current user that sent it.
          const chattedUser = notifs.chat.users.find((sender: any) => sender !== userId);
          // create new notif object
          let notifsObj = {
            _id: notifs._id,
            chatId: notifs.chat._id,
            //sender: notifs.user,
            sender: chattedUser,
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
      //console.log('curr user', userId, 'check conditons 1', notifs.chatId === notification.chat,
         //'2', notifs.text === notification.content, '3', notifs.sender === notification.sender._id);
      
      // console.log('curr user', userId, 'condition 1 chatId:', notifs.chatId, 'from notifs', notification.chat);
      console.log('curr user', userId, 'condition 2 text:', notifs.text, 'from notifs', notification.content);
      // console.log('curr user', userId, 'condition 3 sender:', notifs.sender, 'from notifs', notification.sender._id);
      return notifs.chatId === notification.chat
        && notifs.text === notification.content
        && notifs.sender !== userId;
    });

    //console.log('curr user', userId,'matched notifs?', matchedChatNotif);

    // if the notification is found, set it to unread
    // if (matchedChatNotif) {
    //   // set notifId to state
    //   setMatchedNotifId(matchedChatNotif._id);

    //   if (matchedChatNotif.read === false) {
    //     // not read
    //     //setUnread(true);
    //     console.log('false happening');
    //     return true;
    //   } else {
    //     // is already read, run the function
    //     console.log('true happening');
    //     //setUnread(false);
    //     return false;
    //   }
    // } else {
    //   // data is undefined, no new messages
    //   //setUnread(false);
    //   return false;
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
              onPress={() => {
                // navigate and make message unread
                navigation.navigate('Message', {
                  chatId: item._id,
                  name: item.latestMessage.chattedUser.profile.name,
                });

                // run this if there is an id
                // if (matchedNotifId) {
                //   isReadNotification(matchedNotifId, token)
                //     .then((res) => {
                //       console.log('done!');
                //       setUnread(false);
                //     })
                //     .catch((e: any) => {
                //       console.error(e.response.data.message);
                //     });
                //   }
                }
              }
              image={item.latestMessage.chattedUser.profile.photo}
              name={item.latestMessage.chattedUser.profile.name}
              latestMessage={item.latestMessage.content}
              unread={isThreadUnread(item.latestMessage)}
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