import React, {
  useEffect,
  useState,
  useCallback
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

import {
  getMessages,
  postMessage
} from '../utils';
import { API_URL } from '@env';

const SingleMessage = ({ fetchAgain, route, navigation, userData }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [socketConnected, isSocketConnected] = useState<any>(false);
  const [typing, setTyping] = useState<any>(false);
  const [isTyping, setIsTyping] = useState<any>(false);

  const { token, userId } = userData;
  const { chatId, name } = route.params;

  // fetch messages from chatId
  const fetchMessages = async () => {
    setLoading(true);
    getMessages(chatId, token)
      .then((res: any) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e.message);
      })
  };

  // post messages to chatId
  const sendMessages = async (content: string) => {
    setLoading(true);
    postMessage(userId, token, content, chatId)
      .then((res: any) => {
        console.log(res.data);
        setMessages([...messages, res.data]);
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  };

  // refresh messages
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      {console.log(messages[0]?.sender._id)}
      <GiftedChat 
        messages={messages}
        onSend={() => console.log('on send')}
        //user={{ _id: messages[0]?.sender._id}}
      />
    </>
   
  )
}

export default SingleMessage;