import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ChatContextData } from '../types';

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

const ChatProvider:FC = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [selectedChat, setSelectedChat] = useState<any>();
  const [chats, setChats] = useState<any>();

  useEffect(() => {
    // set user info from auth provider storage
    AsyncStorage.getItem('@auth').then((res: any) => {
      const userData = JSON.parse(res);

      setUser(userData);

      if (!userData) console.log("There's no user data for chats");
    }).catch(e => {
      Promise.reject(e.message);
    });
  }, []);
  
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

const useChatState = () => {
  return useContext(ChatContext);
}

export {
  useChatState,
  ChatProvider
}
