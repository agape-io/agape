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

export {
  HomeNavigatorParamList,
  RootNavigatorParamsList,
  AuthNavigatorParamList
}