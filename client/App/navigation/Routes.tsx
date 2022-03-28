/**
 * Main Handler for Routes
 */
import React, { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Types
import {
  AuthNavigatorParamList,
  RootNavigatorParamsList,
  HomeTabNavigatorParamList,
  MessageNavigatorParamList
} from '../types';

// Stacks
import { useAuth } from "../navigation";

// Screens
import {
  TestPage,
  SignIn,
  SignUp,
  Landing,
  Discover,
  Profile,
  Chat,
  Message,
  Settings
} from '../pages';

// Styles
import {
  SECONDARY_COLOR,
  PRIMARY_COLOR
} from '../../assets/styles';
import { ProfileModal } from '../components';

interface State {
  loading?: boolean;
  initializing?: boolean;
}

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const HomeTabStack = createMaterialBottomTabNavigator<HomeTabNavigatorParamList>();
const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();
const MessageStack = createNativeStackNavigator<MessageNavigatorParamList>();

const Messaging: FC = () => {
  const { Navigator, Screen } = MessageStack;

  return (
    <Navigator
      initialRouteName="Messages"
    >
      <Screen
        name="Messages"
        component={Chat}
      />
      <Screen
        name="Message"
        component={Message}
      //options={({ route }) => ({ title: route.params.user })}
      />
    </Navigator>
  )
}

const HomeTabs: FC = () => {
  const { Navigator, Screen } = HomeTabStack;

  return (
    <Navigator
      initialRouteName="Discover"
      activeColor={SECONDARY_COLOR}
      barStyle={{ backgroundColor: PRIMARY_COLOR }}
    >
      <Screen
        name="Test"
        component={TestPage}
        options={{
          tabBarLabel: 'Test',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="test-tube-empty" color={color} size={26} />
          )
        }}
      />
      <Screen
        name="Chat"
        component={Messaging}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-outline" color={color} size={26} />
          )
        }}
      />
      <Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-circle-outline" color={color} size={26} />
          )
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={26} />
          )
        }}
      />

      {/* <Screen
        name="Message"
        component={Message}
      /> */}
    </Navigator>
  )
}


const Auth: FC = () => {
  const { Navigator, Screen } = AuthStack;

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Landing" component={Landing} />
      {/* <Screen name="Message" component={Message} /> */}

    </Navigator>
  )
}

const Routes: FC<State> = () => {
  const { authData, loading } = useAuth();
  const { Screen, Navigator, Group } = RootStack;

  // if loading, render screen
  if (loading) {
    return <Landing />;
  }

  return (
    <NavigationContainer>
      <Navigator>
        {authData ? (
          <>
            <Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
            <Screen name="Settings" component={Settings} options={{ headerShown: true }} />
            <Group screenOptions={{ presentation: 'modal' }}>
              <Screen
                name="ProfileModal"
                component={ProfileModal}
                options={{ headerTransparent: true, headerTitle: '' }}
              />
            </Group>
          </>
        ) : (
          // <Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
          <Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        )}
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes;
