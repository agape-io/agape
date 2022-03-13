import React from 'react';
import { NavigatorScreenParams } from "@react-navigation/native";

type AuthNavigatorParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Landing: undefined;
}

type HomeTabNavigatorParamList = {
  Discover: undefined;
  Test: undefined;
  Profile: undefined;
}

type RootNavigatorParamsList = {
  Auth: NavigatorScreenParams<AuthNavigatorParamList>
  Home: NavigatorScreenParams<HomeTabNavigatorParamList>
  ProfileModal: undefined;
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
  // data: any;
  name: string;
  gender?: string;
  aboutMe?: string;
  age?: string;
  year?: string;
  location?: string;
  religion?: string;
  hobby?: string;
};

export {
  HomeTabNavigatorParamList,
  RootNavigatorParamsList,
  AuthNavigatorParamList,
  AuthContextData,
  AuthData,
  CardItemT,
  IconT,
  ProfileItemT
}
