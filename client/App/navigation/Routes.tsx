/**
 * Main Handler for Routes
 */
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Types
import {
  HomeNavigatorParamList,
  AuthNavigatorParamList,
  RootNavigatorParamsList
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
  Profile
} from '../pages';

// Styles
import {
  SECONDARY_COLOR,
  PRIMARY_COLOR
} from '../../assets/styles';

interface State {
  loading?: boolean;
  initializing?: boolean;
}

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();
const HomeStack = createMaterialBottomTabNavigator<HomeNavigatorParamList>();
const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>();

const Home: FC = () => {
  const { Navigator, Screen } = HomeStack;

  return (
    <Navigator
      initialRouteName="Discover"
      activeColor={SECONDARY_COLOR}
      barStyle={{ backgroundColor: PRIMARY_COLOR}}
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
    </Navigator>
  )
}

const Routes: FC<State> = () => {
  const { authData, loading } = useAuth();
  const { Screen, Navigator } = RootStack;

  // if loading, render screen
  if (loading) {
    return <Landing />;
  }

  return (
    <NavigationContainer>
      <Navigator>
        {authData ? (
          <Screen name="Home" component={Home} options={{ headerShown: false }} />
        ) : (
          <Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        )}
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes;
