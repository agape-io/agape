import React, {
  useEffect,
  useState
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
  const [newMessage, setNewMessage] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  const [socketConnected, isSocketConnected] = useState<any>(false);
  const [typing, setTyping] = useState<any>(false);
  const [isTyping, setIsTyping] = useState<any>(false);

  const { token, userId } = userData;
  const { chatId, name } = route.params;

  // fetch messages from chatId
  const fetchMessages = async () => {
    getMessages(chatId, token)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((e: any) => {
        console.error(e.message);
      })
  };

  // post messages to chatId
  const sendMessages = async (content: string) => {
    postMessage(userId, token, content, chatId)
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  };

  // refresh messages
  useEffect(() => {
    console.log('params', chatId, name);
  }, []);

  return (
    <GiftedChat 
      //messages={}
      onSend={() => console.log('on send')}
      //user={{_id: }}
    />
  )
}

export default SingleMessage;