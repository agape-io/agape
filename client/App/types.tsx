import React from 'react';
import { NavigatorScreenParams } from "@react-navigation/native";

type AuthNavigatorParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Landing: undefined;
}

type HomeNavigatorParamList = {
  //Home: undefined;
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

export {
  HomeNavigatorParamList,
  RootNavigatorParamsList,
  AuthNavigatorParamList,
  AuthContextData,
  AuthData
}