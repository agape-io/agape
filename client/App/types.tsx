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
  NavigatorScreenParams,
  RouteProp
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
  swipe: string;
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

type SubscriptionItemT = {
  data: any;
}

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

interface SectionData {
  type: 'SECTION'
  key?: string
  header?: string
  footer?: string | (() => React.ReactElement<any>)
  rows: RowData[]
}

interface SectionProps {
  section: SectionData
  globalTextStyle?: TextStyle
}

interface State {
  loading?: boolean;
  initializing?: boolean;
}

interface DiscoverProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Discover'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

interface ChatProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Chat'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

interface LandingProps {
  navigation?: NativeStackNavigationProp<AuthNavigatorParamList, 'Landing'>;
}

interface MessageProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Chat'>,
      NativeStackNavigationProp<RootNavigatorParamsList>>;
  route: RouteProp<MessageStackParamList>;
};

interface ProfileProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Profile'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

interface SignInProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<AuthNavigatorParamList, 'SignIn'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
  email: string;
  password: string;
}

interface SignUpProps {
  navigation: NativeStackNavigationProp<AuthNavigatorParamList, 'SignUp'>;
  email: string;
  password: string;
  verifyPassword: string;
};

interface TestPageProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Test'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
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
  SubscriptionItemT,
  SettingsScreenT,
  MessageT,
  ProfileModalProps,
  SettingsProps,
  ChevronProps,
  ContainerProps,
  TopBorderContainerProps,
  RowData,
  RowProps,
  SectionData,
  SectionProps,
  State,
  DiscoverProps,
  ChatProps,
  LandingProps,
  MessageProps,
  ProfileProps,
  SignInProps,
  SignUpProps,
  TestPageProps
}