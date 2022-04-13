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

// APIs
import { API_URL } from '@env';
import { useAuth } from '../context';
import {
  getMessages,
  postMessage,
  getUserChats
} from '../utils';

let socket: any;

const SingleMessage = ({ route, userData }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [socketConnected, isSocketConnected] = useState<boolean>(false);
  // const [typing, setTyping] = useState<any>(false);
  // const [isTyping, setIsTyping] = useState<any>(false);

  const { notification, setNotification } = useAuth().authData;
  const { token, userId } = userData;
  const { chatId } = route.params;

  // fetch messages from chatId
  const fetchMessages = async () => {
    setLoading(true);
    getMessages(chatId, token)
      .then((res: any) => {
        // Create a new message object for GiftedChat
        const giftedChatFormat = res.data.map((message: any) => {
          let gcf = {
            _id: message._id,
            createdAt: message.createdAt,
            text: message.content,
            user: {
              _id: message.sender._id,
              name: message.sender.profile.name,
              avatar: message.sender.profile.photo
            }
          }
          return gcf;
        });

        // have messages array go in reverse
        let reverse = [...giftedChatFormat].reverse();
        setMessages(reverse);
        setLoading(false);

        // socket joins chat
        socket.emit('join chat', chatId);
      })
      .catch((e: any) => {
        console.error(e.response.data.message);
      });
  };

  //send system message for new match
  const systemMessageMatch = async () => {
    let text = "You have a new match!";

    getUserChats(userId, token)
      .then((res: any) => {
        console.log(res.data);

        let _chatId = res.data.map((chat: any, index: any) => {
          // find the users that don't match with curr user
          // let foundUser = chat.users.find((item: any) => item._id !== userId);
          return chat._id;
        });

        postMessage(userId, token, text, _chatId)
          .then((res: any) => {
            const { createdAt, content } = res.data;

            // formatted for giftedchat
            let newMessage: any = {
              _id: 1,
              text: content,
              createdAt: createdAt,
              system: true,
            };

            // send to socket io
            socket.emit('new message', res.data);

            // GiftedChat Data is appended
            setMessages((previousMessages: any) => GiftedChat.append(previousMessages, newMessage));
            setLoading(false);
          })
          .catch((e: any) => {
            console.error(e.response.data.message);
          });
      }).catch(e => {
        console.error(e.response.data.message);
      });
  };

  // calls set mesasges
  const onSend = useCallback((messages = []) => {
    let content = messages[0].text;
    setLoading(true);

    // send the message to the db
    postMessage(userId, token, content, chatId)
      .then((res: any) => {
        const { _id, createdAt, content, sender } = res.data;

        // formatted for giftedchat
        let newMessage: any = {
          _id,
          createdAt,
          text: content,
          user: {
            _id: sender._id,
            name: sender.profile.name,
            avatar: sender.profile.photo
          }
        };

        // send to socket io
        socket.emit('new message', res.data);

        // GiftedChat Data is appended
        setMessages((previousMessages: any) => GiftedChat.append(previousMessages, newMessage));
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e.response.data.message);
      });
  }, []);

  // send system message if there is a new match or if chat contents are empty
  useEffect(() => {
    systemMessageMatch();
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

    // cleanup
    return () => {
      setMessages([]);
    }
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
        //renderBubble={()}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: userId }}
      />
      {
        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
    </>
  );
}

export default SingleMessage;