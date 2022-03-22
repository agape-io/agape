import React, {
  useEffect,
  useState,
  useCallback,
  useRef
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import io from 'socket.io-client';


import {
  getMessages,
  postMessage
} from '../utils';

const SingleMessage = ({ route, navigation, userData }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [socketConnected, isSocketConnected] = useState<any>(false);
  const isMounted = useRef<any>(null);
  // const [typing, setTyping] = useState<any>(false);
  // const [isTyping, setIsTyping] = useState<any>(false);

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
      })
      .catch((e: any) => {
        console.error(e.message);
      })
  };

  // calls set mesasges
  const onSend = useCallback((messages = []) => {
    let content = messages[0].text;
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
    setLoading(true);
    
    // send the message to the db
    postMessage(userId, token, content, chatId)
      .then((res: any) => {
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e.message);
      });
  }, []);

  // refresh messages, use useFocusEffect() or socket.io
  useFocusEffect(
    useCallback(() => {
      fetchMessages();
      isMounted.current = true;

      return () => {
        setMessages([]);
        isMounted.current = false;
      }
    }, [])
  );

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