/**
 * All Defined Types and Interfaces
 */
import React from 'react';
import {
  ImageStyle,
  TextStyle
} from 'react-native';
import {
  CompositeNavigationProp,
  NavigatorScreenParams
} from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
  signIn(email: string, password: string): any;
  signOut(): any;
  children?: React.ReactNode;
  notification: any;
  setNotification: any;
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

type MessageT = {
  image: any;
  lastMessage: string;
  name: string;
};

type ProfileModalProps = {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Profile'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

type SettingsProps = {
  navigation: NativeStackNavigationProp<RootNavigatorParamsList, 'Settings'>;
}
interface ChevronProps {
  style?: ImageStyle
}

interface ContainerProps {
  height: number
}

interface TopBorderContainerProps {
  isFirst: boolean
}

interface RowData {
  title: string
  titleStyle?: TextStyle
  subtitle?: string
  subtitleStyle?: TextStyle
  onPress?: () => void
  showDisclosureIndicator?: boolean
  renderAccessory?: () => React.ReactElement<any>
}

interface RowProps extends RowData {
  titleStyles?: (TextStyle | undefined)[]
  subtitleStyles?: (TextStyle | undefined)[]
  isFirst: boolean
  isLast: boolean
  children?: any
}

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
  MessageT,
  ProfileModalProps,
  SettingsProps,
  ChevronProps,
  ContainerProps,
  TopBorderContainerProps,
  RowData,
  RowProps
}