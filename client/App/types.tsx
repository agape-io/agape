import React from 'react';
import { NavigatorScreenParams } from "@react-navigation/native";

type AuthNavigatorParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Landing: undefined;
}

type HomeNavigatorParamList = {
  Discover: undefined;
  Test: undefined;

}

type RootNavigatorParamsList = {
  Auth: NavigatorScreenParams<AuthNavigatorParamList>
  Home: NavigatorScreenParams<HomeNavigatorParamList>
}
type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  children?: React.ReactNode;
}

type AuthData = {
  token: string,
  email: string
}

export type IconT = {
  name: any;
  size: number;
  color: string;
  style?: any;
};

export {
  HomeNavigatorParamList,
  RootNavigatorParamsList,
  AuthNavigatorParamList,
  AuthContextData,
  AuthData
}

export type CardItemT = {
  description?: string;
  hasActions?: boolean;
  hasVariant?: boolean;
  image: any;
  isOnline?: boolean;
  matches?: string;
  name: string;
};