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
  Profile: undefined;
}

type RootNavigatorParamsList = {
  Auth: NavigatorScreenParams<AuthNavigatorParamList>
  Home: NavigatorScreenParams<HomeNavigatorParamList>
}
type AuthContextData = {
  authData: AuthData;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  children?: React.ReactNode;
}

type AuthData = {
  token: string,
  email: string,
  userId: string,
  isOnline: boolean,
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
  age?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: string;
  matches: string;
  name: string;
};

export {
  HomeNavigatorParamList,
  RootNavigatorParamsList,
  AuthNavigatorParamList,
  AuthContextData,
  AuthData,
  CardItemT,
  IconT,
  ProfileItemT
}