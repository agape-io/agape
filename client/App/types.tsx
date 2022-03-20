import React from 'react';
import { NavigatorScreenParams } from "@react-navigation/native";

type AuthNavigatorParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Landing: undefined;
}

type MessageStackParamList = {
  Message: {
    name?: any;
    chatId: any
  };
  Messages: {
    thread?: string;
    id?: any;
  };
}

type HomeTabNavigatorParamList = {
  Discover: undefined;
  Test: undefined;
  Profile: undefined;
  Chat: undefined;
}

type RootNavigatorParamsList = {
  Auth: NavigatorScreenParams<AuthNavigatorParamList>
  Home: NavigatorScreenParams<HomeTabNavigatorParamList>
  ProfileModal: undefined;
  Chat: NavigatorScreenParams<MessageStackParamList>;
}

type AuthContextData = {
  authData: any;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  children?: React.ReactNode;
}

type ChatContextData = {
  children?: React.ReactNode;
  user: any,
  setUser: any,
  selectedChat: any,
  setSelectedChat: any,
  chats: any,
  setChats: any
}

type CardItemT = {
  data: any;
  hasActions?: boolean;
  hasVariant?: boolean;
};

type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

type ProfileItemT = {
  data: any;
};

type MessageT = {
  image: any;
  lastMessage: string;
  name: string;
};

export {
  HomeTabNavigatorParamList,
  RootNavigatorParamsList,
  MessageStackParamList,
  AuthNavigatorParamList,
  AuthContextData,
  CardItemT,
  IconT,
  ProfileItemT,
  MessageT,
  ChatContextData
}
