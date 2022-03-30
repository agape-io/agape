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
    chatId: any;
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
  SubscriptionModal: undefined;
  Chat: NavigatorScreenParams<MessageStackParamList>;
  Settings: undefined;
}

type AuthContextData = {
  authData: any;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  children?: React.ReactNode;
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

type SettingsScreenT = {
  data: any;
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
  SettingsScreenT,
}