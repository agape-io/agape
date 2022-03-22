import React, {
  useEffect,
  useState,
  useCallback
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { KeyboardAvoidingView, Platform } from 'react-native';
import io from 'socket.io-client';

import {
  getMessages,
  postMessage
} from '../utils';

const SingleMessage = ({ fetchAgain, route, navigation, userData }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState<any>(false);
  const [socketConnected, isSocketConnected] = useState<any>(false);
  // const [typing, setTyping] = useState<any>(false);
  // const [isTyping, setIsTyping] = useState<any>(false);

  const { token, userId } = userData;
  const { chatId, name } = route.params;

  // fetch messages from chatId
  const fetchMessages = async () => {
    setLoading(true);
    getMessages(chatId, token)
      .then((res: any) => {
        let messageArr = res.data.map((item: any) => ({
          _id: item._id,
          createdAt: item.createdAt,
          text: item.content,
          user: {
            _id: item.sender._id,
            name: item.sender.profile.name,
            avatar: item.sender.profile.photo
          }
        }));

        // set sender
        console.log(messageArr);
        //setUser(senderObj);        
        setMessages(messageArr);
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e.message);
      })
  };

  // calls set mesasges
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
    
    let content = messages[0];
    setLoading(true);
    postMessage(userId, token, content, chatId)
      .then((res: any) => {
        let arr = [];
        //console.log(res.data);
        /**
         * we only want:
         * 
         * message_id,
         * content,
         * createdAt,
         * sender profile (user_id, name, photo)
         * 
         * what GiftedChat wants:
         * [{
         *  _id: message_id,
         *  text: content,
         *  createdAt: createdAt,
         *  user: {
         *    _id: user_id,
         *     name: user.name
         *     avatar: user.photo
         *   }
         * }]
         */
        // send to giftedChat
        //setMessages([...messages, res.data]);
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  }, []);

  // refresh messages
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <GiftedChat 
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user._id,
          name: user.name,
          avatar: user.avatar
        }}
      />
      {
        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
    </>
   
  )
}

export default SingleMessage;