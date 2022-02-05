import { NavigatorScreenParams } from "@react-navigation/native";

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Landing: undefined;
}

type HomeStackParamList = {
  Home: undefined;
  Test: undefined;
}

type RootNavigatorParamsList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  Home: NavigatorScreenParams<HomeStackParamList>
}

export {
  HomeStackParamList,
  RootNavigatorParamsList,
  AuthStackParamList
}