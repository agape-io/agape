/**
 * Single Messages Component
 */
import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import io from 'socket.io-client';
import { useFocusEffect } from '@react-navigation/native';

// APIs
import { API_URL } from '@env';
import { useAuth } from '../context';
import {
  getMessages,
  postMessage
} from '../utils';

let socket: any;

const SingleMessage = ({ route, navigation, userData }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [socketConnected, isSocketConnected] = useState<boolean>(false);
  // const [typing, setTyping] = useState<any>(false);
  // const [isTyping, setIsTyping] = useState<any>(false);

  const { selectedChat, setSelectedChat, notification, setNotification } = useAuth().authData;
  const { token, userId } = userData;
  const { chatId } = route.params;

  // fetch messages from chatId
  const fetchMessages = async () => {
    setLoading(true);
    getMessages(chatId, token)
      .then((res: any) => {
        // Create a new message object for GiftedChat
        let messageArr = res.data.map((message: any) => ({
          _id: message._id,
          createdAt: message.createdAt,
          text: message.content,
          user: {
            _id: message.sender._id,
            name: message.sender.profile.name,
            avatar: message.sender.profile.photo
          }
        }));

        // have messages array go in reverse
        let reverse = [...messageArr].reverse();
        setMessages(reverse);
        setLoading(false);
        socket.emit('join chat', chatId);
      })
      .catch((e: any) => {
        console.error(e.message);
      })
  };

  // calls set mesasges
  const onSend = useCallback((messages = []) => {
    let content = messages[0].text;
    setLoading(true);
    
    // send the message to the db
    postMessage(userId, token, content, chatId)
      .then((res: any) => {
        const { data } = res;
        socket.emit('new message', data);
        setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  }, []);

   // socket-io initialization
  useEffect(() => {
    socket = io(API_URL);
    socket.emit('setup', userId);
    socket.on('connection', () => isSocketConnected(true));
  }, []);

  // fetch messages
  useEffect(() => {
    fetchMessages();
  }, []);

  // Check messages recieved
  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved: any) => {
      if (chatId !== newMessageRecieved.chat._id) {
        // give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    })
  });

  return (
    <>
      <GiftedChat 
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: userId}} 
      />
      {
        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
    </>
   
  )
}

export default SingleMessage;